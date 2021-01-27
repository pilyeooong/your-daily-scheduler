import axios from 'axios';
import cheerio = require('cheerio');
import typeorm = require('typeorm');
import { getCoronaData } from '../../crawling/covid';

describe('getCoronaData', () => {
  it('코로나 데이터를 조회 후 covidStatus 객체에 담아 리턴한다.', async () => {
    const mockAxios = {
      data: {
        result: 'result',
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockAxios);
    cheerio.load = jest.fn().mockReturnValue({
      find: jest.fn(),
      children: jest.fn(),
      text: jest.fn().mockReturnValueOnce('100').mockReturnValueOnce('200'),
    });

    await getCoronaData();
  });
});
