import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Schedule from '../entity/Schedule';
import Todo from '../entity/Todo';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const todoDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const { todoId } = req.params;

    const user = await getRepository(User).findOne({ id: userId });
    const schedule = await getRepository(Schedule).findOne({ user });
    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }
    const todoRepository = await getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { schedule, id: todoId },
    });

    if (!todo) {
      return res.status(400).send('존재하지 않는 todo 입니다.');
    }

    return res.status(200).send(todo);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const { todoId } = req.params;
    const { content } = req.body;

    const user = await getRepository(User).findOne({ id: userId });
    const schedule = await getRepository(Schedule).findOne({ user });
    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const todoRepository = await getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { schedule, id: todoId },
    });
    if (!todo) {
      return res.status(400).send('존재하지 않는 todo 입니다.');
    }
    await todoRepository.save([{ id: todo.id, content }]);

    return res.status(200).send('수정 완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const { todoId } = req.params;

    const user = await getRepository(User).findOne({ id: userId });
    const schedule = await getRepository(Schedule).findOne({ user });
    if (!schedule) {
      return res.status(400).send('존재하지 않는 스케줄입니다.');
    }

    const todoRepository = await getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { schedule, id: todoId },
    });
    if (!todo) {
      return res.status(400).send('존재하지 않는 todo 입니다.');
    };

    await todoRepository.delete(todo.id);
    
    return res.status(200).send('삭제 완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
