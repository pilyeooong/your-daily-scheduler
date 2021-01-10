import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Schedule from '../entity/Schedule';
import Todo from '../entity/Todo';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const { id } = req.decoded as IDecoded;

    const user = await getRepository(User).findOne({ id });
    const schedule = await getRepository(Schedule).findOne({ user });
    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }
    const todoRepository = await getRepository(Todo);

    const newTodo = await todoRepository.create({ content, schedule });
    await todoRepository.save(newTodo);

    return res.status(201).send(newTodo);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getDetail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const editTodo = (req: Request, res: Response, next: NextFunction) => {};
export const deleteTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
