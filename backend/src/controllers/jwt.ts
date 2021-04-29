import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IDecoded } from '../interfaces';

dotenv.config();

export const signJWT = (userId: number, loginKeeper?: boolean): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SIGNATURE!, {
    ...(!loginKeeper && { expiresIn: '6h' }),
    issuer: 'todo',
  });
};

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization;
    if (!token) {
      return res.status(400).send('인증되지 않은 요청입니다.');
    }
    req.decoded = jwt.verify(token, process.env.JWT_SIGNATURE!) as IDecoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).send('만료된 토큰입니다.');
    }
    return res.status(401).send('유효하지 않은 토큰입니다.');
  }
};
