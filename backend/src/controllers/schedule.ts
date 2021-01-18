import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Schedule from '../entity/Schedule';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const loadSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.decoded) {
      const { id } = req.decoded as IDecoded;
      const user = await getRepository(User).findOne({ id });
      if (!user) {
        return res.status(400).send('존재하지 않는 유저입니다.');
      }
      const schedule = await getRepository(Schedule)
        .createQueryBuilder('schedule')
        .innerJoinAndSelect('schedule.todos', 'todo')
        .where('schedule.userId = :userId', { userId: user.id })
        .orderBy('todo.index', 'ASC')
        .getOne();
      if (!schedule) {
        return res.status(400).send('존재하지 않는 스케줄 입니다.');
      }
      return res.status(200).send(schedule);
    }
    return res.status(400).send('잘못된 요청입니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
