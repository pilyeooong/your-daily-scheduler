import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Event from '../entity/Event';
import Schedule from '../entity/Schedule';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const loadEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.decoded as IDecoded;

    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const events = await getRepository(Event).find({ where: { schedule } });

    return res.status(200).send(events);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.decoded as IDecoded;
    const { content, date } = req.body;

    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const newEvent = await getRepository(Event).create({
      content,
      date,
      schedule,
    });
    await getRepository(Event).save(newEvent);

    return res.status(201).send(newEvent);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const loadEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.decoded as IDecoded;
    const { date } = req.query;
    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }
    const event = await getRepository(Event).find({
      where: { schedule, date },
    });

    return res.status(200).send(event);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
