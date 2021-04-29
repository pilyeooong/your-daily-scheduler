import { Request, Response } from 'express';

type Body = {
  [key: string]: any;
};

type Params = {
  [key: string]: string;
};

type Queries = {
  [key: string]: string;
};

type Headers = {
  [key: string]: string;
};

export const mockRequest = (
  body?: Body,
  params?: Params,
  queries?: Queries,
  headers?: Headers
): Request => {
  const req = {
    decoded: {
      id: 1,
    },
    body: {
      ...body,
    },
    params: {
      ...params,
    },
    query: {
      ...queries,
    },
    headers: {
      ...headers,
    },
  } as unknown;

  return req as Request;
};

export const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown;

  return res as Response;
};
