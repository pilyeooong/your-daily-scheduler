import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Schedule from "../entity/Schedule";
import User from "../entity/User";
import { IDecoded } from "../interfaces";

export const loadSchedules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.decoded) {
      const { id } = req.decoded as IDecoded;
      const user = await getRepository(User).findOne({ id });

      const schedule = await getRepository(Schedule).findOne({ user });

      return res.status(200).send(schedule);
    }
    return res.status(400).send('잘못된 요청입니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
}