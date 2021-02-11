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
    const { date, page } = req.query;
    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const eventRepository = getRepository(Event);
    const eventsWithoutTime = await eventRepository.findAndCount({
      where: { schedule, date, startTime: null },
      take: 3,
      skip: page ? (+page - 1) * 3 : 0,
    });

    return res.status(200).json({
      eventsWithoutTime: eventsWithoutTime[0],
      eventsWithoutTimeTotalPages: Math.ceil(eventsWithoutTime[1] / 3),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const loadEventsWithTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.decoded as IDecoded;
    const { date, page } = req.query;
    const user = await getRepository(User).findOne({ where: { id } });
    const schedule = await getRepository(Schedule).findOne({ where: { user } });

    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const eventRepository = getRepository(Event);
    const eventsWithTime = await eventRepository
      .createQueryBuilder('event')
      .where('event.scheduleId = :scheduleId', { scheduleId: schedule.id })
      .andWhere('event.date = :date', { date })
      .andWhere('event.startTime is not null')
      .orderBy('event.startTime', 'ASC')
      .addOrderBy('event.endTime', 'ASC')
      .take(3)
      .skip(page ? (+page - 1) * 3 : 0)
      .getManyAndCount();

    const parsedEventsWithTime = eventsWithTime[0].map((event) => {
      const parsedStartTime = event.startTime.toString();
      const parsedEndTime = event.endTime.toString();
      return {
        ...event,
        startTime: parsedStartTime,
        endTime: parsedEndTime,
      };
    });

    return res.status(200).json({
      parsedEventsWithTime,
      eventsWithTimeTotalPages: Math.ceil(eventsWithTime[1] / 3),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
