import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Event from '../entity/Event';
import Schedule from '../entity/Schedule';
import User from '../entity/User';
import { IDecoded, IEvent } from '../interfaces';

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
    const { content, date, startTime, endTime }: IEvent = req.body;

    let parsedStartTime;
    let parsedEndTime;

    if (startTime && endTime) {
      parsedStartTime = new Date(startTime);
      parsedEndTime = new Date(endTime);
    }
    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const newEvent = await getRepository(Event).create({
      content,
      date,
      schedule,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
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
    const events = await getRepository(Event).find({
      where: { schedule, date },
      order: { startTime: 'ASC', endTime: 'ASC' },
    });

    const parsedEvents = events.map((event) => {
      let parsedStartTime;
      let parsedEndTime;
      if (event.startTime && event.endTime) {
        parsedStartTime = event.startTime.toString();
        parsedEndTime = event.endTime.toString();
      }
      return { ...event, startTime: parsedStartTime, endTime: parsedEndTime };
    });

    return res.status(200).send(parsedEvents);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
