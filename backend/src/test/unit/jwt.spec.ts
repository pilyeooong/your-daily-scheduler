import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { signJWT, verifyJWT } from '../../controllers/jwt';

dotenv.config();

const USER_ID = 1;
const TOKEN = 'TOKEN';

jest.mock('jsonwebtoken');

const mockRequest = (): Request => {
  const req = {
    headers: {
      authorization: TOKEN,
    },
  } as unknown;
  return req as Request;
};

const mockResponse = (): Response => {
  const res = { status: jest.fn(() => res), send: jest.fn() } as unknown;
  return res as Response;
};

describe('signJWT', () => {
  it('userId를 전달받으면 토큰을 발급 한다', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation(() => TOKEN);
    const token = await signJWT(USER_ID);
    expect(typeof token).toBe('string');
    expect(token).toEqual(TOKEN);
    expect(jwt.sign).toBeCalledTimes(1);
    expect(jwt.sign).toBeCalledWith(
      { id: USER_ID },
      process.env.JWT_SIGNATURE,
      {
        expiresIn: '30m',
        issuer: 'todo',
      }
    );
  });
});

describe('verifyJWT', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next: NextFunction = jest.fn();

  it('올바른 토큰일 시 next()를 호출한다.', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => ({ id: USER_ID }));
    await verifyJWT(req, res, next);
    expect(jwt.verify).toBeCalledTimes(1);
    expect(jwt.verify).toBeCalledWith(TOKEN, process.env.JWT_SIGNATURE);
    expect(next).toBeCalled();
  });

  it('유효하지 않은 토큰일 시 에러', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error();
    });
    await verifyJWT(req, res, next);
    expect(res.status).toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith('유효하지 않은 토큰입니다.');
  });

  it('만료 된 토큰 일 시 토큰일 시 에러', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw { name: 'TokenExpiredError' };
    });

    await verifyJWT(req, res, next);
    expect(res.status).toBeCalledWith(419);
    expect(res.send).toBeCalledWith('만료된 토큰입니다.');
  });
});
