import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { loadSchedules } from "../../controllers/schedule"
import User from '../../entity/User';
import Schedule from '../../entity/Schedule';

jest.mock('../../entity/Schedule');
jest.mock('../../entity/User');

const mockRequest = (): Request => {
  const req = {
    decoded: {
      id: 1
    }
  } as unknown;

  return req as Request;
}

const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  } as unknown;

  return res as Response;
}

const req = mockRequest();
const res = mockResponse();
const next = jest.fn();

describe('loadSchedules', () => {
  it('스케줄을 반환', async () => {
    await loadSchedules(req, res, next);
  })
})