import axios from 'axios';
import cheerio = require('cheerio');
import typeorm = require('typeorm');
import { loadCovidStatusData } from '../../controllers/covid';
import { getCoronaData } from '../../crawling/covid';
import Covid from '../../entity/Covid';
import { mockRequest, mockResponse } from '../mock';

describe('getCoronaData', () => {
  it('코로나 데이터를 조회 후 covidStatus 객체에 담아 리턴한다.', async () => {
    const mockAxios = {
      data: 'result',
    };
    const mockCity = 'testCity';
    const mockTotalCases = '1000';
    const mockIncreasedCases = '+10';
    const mockStandardTime = '2021년 01.27. 00시';

    const mockText = jest
      .fn()
      .mockReturnValueOnce(mockCity)
      .mockReturnValueOnce(mockTotalCases)
      .mockReturnValueOnce(mockIncreasedCases)
      .mockReturnValue(mockStandardTime);

    axios.get = jest.fn().mockResolvedValue(mockAxios);
    cheerio.load = jest.fn().mockReturnValue(() => ({
      find: jest.fn().mockReturnThis(),
      children: jest.fn().mockReturnThis(),
      text: mockText,
      each: jest.fn(),
    }));

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      save: jest.fn(),
    });
    await getCoronaData();
    expect(typeorm.getRepository).toHaveBeenCalledWith(Covid);
    expect(typeorm.getRepository(Covid).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Covid).save).toHaveBeenCalled();
    expect(typeorm.getRepository(Covid).create).toHaveBeenCalled();
  });
});

describe('loadCovidStatusData', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = jest.fn();

  const MOCK_COUNTRY_STATUS = 'MOCK_COUNTRY_STATUS';
  const MOCK_CITY_STATUS = 'MOCK_CITY_STATUS';

  it('유효한 요청이나 지역 설정을 마치지 않을 시 200 응답코드와 전국 확진자 수 정보만을 반환한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValueOnce({ id: 1 }).mockResolvedValue(MOCK_COUNTRY_STATUS),
    });

    await loadCovidStatusData(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      cityStatus: undefined,
      wholeCountryStatus: MOCK_COUNTRY_STATUS,
    });
  });

  it('유효한 요청 일 시 200 응답코드와 전국 및 설정 지역 확진자 수 정보를 반환한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce({ id: 1, city: 'testCity' })
        .mockResolvedValueOnce(MOCK_CITY_STATUS)
        .mockResolvedValue(MOCK_COUNTRY_STATUS),
    });

    await loadCovidStatusData(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      cityStatus: MOCK_CITY_STATUS,
      wholeCountryStatus: MOCK_COUNTRY_STATUS,
    });
  });
});
