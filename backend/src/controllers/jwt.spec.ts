import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { signJWT, verifyJWT } from './jwt';

dotenv.config();

const USER_ID = 1;
const TOKEN = 'TOKEN';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
    verify: jest.fn(() => ({ id: USER_ID })),
  };
});

const mockRequest = (): Request => {
  const req = {
    headers: {
      authorization: TOKEN,
    },
  } as unknown;
  return req as Request;
};

const mockResponse = (): Response => {
  const res = { status: () => res, send: jest.fn() } as unknown;
  return res as Response;
};

describe('signJWT', () => {
  it('userId를 전달받으면 토큰을 발급 한다', async () => {
    const token = await signJWT(USER_ID);
    expect(typeof token).toBe('string');
    expect(token).toEqual(TOKEN);
    expect(jwt.sign).toBeCalledTimes(1);
    expect(jwt.sign).toBeCalledWith({ id: USER_ID }, process.env.JWT_SIGNATURE, {
      expiresIn: '30m',
      issuer: 'todo',
    });
  });
});

describe('verifyJWT', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next: NextFunction = jest.fn();

  it('올바른 토큰일 시 next()를 호출한다.', async () => {
    await verifyJWT(req, res, next);
    expect(jwt.verify).toBeCalledTimes(1);
    expect(jwt.verify).toBeCalledWith(TOKEN, process.env.JWT_SIGNATURE);
    expect(next).toBeCalledTimes(1);
  });
});
