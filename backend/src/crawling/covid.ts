import axios from 'axios';
import cheerio = require('cheerio');
import { getRepository } from 'typeorm';
import Covid from '../entity/Covid';
import Corona from '../entity/Covid';

export const getCoronaData = async () => {
  try {
    const covidStatus: Partial<Corona>[] = [];

    const url =
      'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=';
    const result = await axios.get(url);
    if (!result) {
      console.log('조회 실패');
      return;
    }

    const $ = cheerio.load(result.data);

    const $areas = $('div.rpsam_graph')
      .children('div#main_maplayout')
      .children('button');
    const $wholeCountry = $('div.open').find('h4.cityname').text();
    const $total = $('div.open')
      .children('.mapview')
      .children('ul.cityinfo')
      .find('li:first-child span.num')
      .text();
    const $totalIncreased = $('div.open')
      .children('.mapview')
      .children('ul.cityinfo')
      .find('li:nth-of-type(2) span.sub_num')
      .text();
    const $standardTime = $('div.timetable').find('span').text();

    covidStatus[0] = {
      city: $wholeCountry,
      totalCases: $total,
      increasedCases: $totalIncreased,
    };

    $areas.each(function (i, elem) {
      covidStatus[i + 1] = {
        city: $(this).find('span.name').text(),
        totalCases: $(this).find('.num').text(),
        increasedCases: $(this).find('span:nth-of-type(3)').text(),
      };
    });

    const covidRepository = getRepository(Covid);

    covidStatus.forEach(async (status) => {
      const exist = await covidRepository.findOne({
        where: { city: status.city },
      });
      if (!exist) {
        return await covidRepository.save(
          covidRepository.create({
            city: status.city,
            totalCases: status.totalCases,
            increasedCases: status.increasedCases,
            date: $standardTime,
          })
        );
      } else {
        return await covidRepository.save([
          {
            id: exist.id,
            totalCases: status.totalCases,
            increasedCases: status.increasedCases,
          },
        ]);
      }
    });
  } catch (err) {
    console.error(err);
    return;
  }
};
