import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import cheerio = require('cheerio');
import { getRepository } from 'typeorm';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send('존재하지 않는 사용자 입니다.');
    }
    if (!user.city) {
      return res.status(200).json({
        info: '날씨 정보를 가져오기 위한 위치 설정을 먼저 해주세요',
      });
    }
    const url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${encodeURIComponent(
      `${user.city} 날씨`
    )}`;
    const result = await axios.get(url);
    if (!result) {
      return res.status(400).send('날씨 조회 실패');
    }
    const $ = cheerio.load(result.data);

    const $todayWeather = $('div.weather_box')
      .children('div.weather_area._mainArea')
      .children('div.today_area._mainTabContent');

    const $temperature = $todayWeather.find('span.todaytemp').text();
    const $infoMessage = $todayWeather.find('p.cast_txt').text();
    const $weatherImage = $todayWeather.find('span.ico_state').attr('class');
    const $fineDust = $todayWeather
      .children('div.sub_info')
      .find('dl.indicator dd:nth-of-type(1)')
      .text();
    const $fineDustlevel = $todayWeather
      .children('div.sub_info')
      .find('dl.indicator dd:nth-of-type(1)')
      .attr('class');
    const $ultrafineDust = $todayWeather
      .children('div.sub_info')
      .find('dl.indicator dd:nth-of-type(2)')
      .text();
    const $ultrafineDustlevel = $todayWeather
      .children('div.sub_info')
      .find('dl.indicator dd:nth-of-type(2)')
      .attr('class');

    return res.status(200).json({
      temp: $temperature,
      message: $infoMessage,
      image: $weatherImage,
      dust: {
        fine: $fineDust,
        fineLevel: $fineDustlevel,
        ultra: $ultrafineDust,
        ultraLevel: $ultrafineDustlevel,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
