import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Schedule from '../entity/Schedule';
import Todo, { appendTodoIndex } from '../entity/Todo';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const loadTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: scheduleId } = req.params;

    const todos = await getRepository(Todo).find({ where: { schedule: scheduleId }});

    return res.status(200).send(todos);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, scheduleId } = req.body;
    const { id } = req.decoded as IDecoded;

    if (!content) {
      return res.status(400).send('빈 내용은 추가 할 수 없습니다.');
    }

    const user = await getRepository(User).findOne({ id });
    const schedule = await getRepository(Schedule).findOne({ user });
    if (!schedule || scheduleId !== schedule.id) {
      return res.status(400).send('스케줄이 존재하지 않습니다.');
    }
    const todoRepository = await getRepository(Todo);

    const newTodo = await todoRepository.create({ content, schedule });
    await todoRepository.save(newTodo);

    const newTodoWithIndex = await appendTodoIndex(schedule.id, newTodo.id);

    return res.status(201).send(newTodoWithIndex);
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
    }

    await todoRepository.delete(todo.id);

    return res.status(200).send('삭제 완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
