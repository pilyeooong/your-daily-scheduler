import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/user.entity';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = 'test@email.com';
  const password = 'password';

  const userRepository = getRepository(User);
  const user = await userRepository.create({ email, password });
  await userRepository.save(user);
  return res.status(200).send(user);
};
