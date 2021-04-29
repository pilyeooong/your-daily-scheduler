import typeorm = require('typeorm');
import { loadSchedules } from '../../controllers/schedule';
import Schedule from '../../entity/Schedule';
import User from '../../entity/User';
import { mockRequest, mockResponse } from '../mock';

const req = mockRequest();
const res = mockResponse();
const next = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('loadSchedules', () => {
  const mockUser = {
    id: 1,
    email: 'test@test.com',
  };

  const mockSchedule = {
    id: 1,
    userId: 1,
  };

  it('토큰은 유효하나, 해당 유저가 존재하지 않을 시 400 에러를 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
    });
    await loadSchedules(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 유저입니다.');
  });

  it('토큰 및 유저는 존재하나, 스케줄이 존재하지 않을 시 400 에러를 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockUser),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      })),
    });

    await loadSchedules(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 스케줄 입니다.');
  });

  it('토큰, 유저, 스케줄 모두 유효할 시 스케줄을 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValueOnce(mockUser),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockSchedule),
      })),
    });
    await loadSchedules(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository).toHaveBeenCalledWith(Schedule);
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockSchedule);
  });
});
