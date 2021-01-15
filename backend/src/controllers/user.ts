import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';
import Schedule from '../entity/Schedule';
import { signJWT } from './jwt';
import { IDecoded } from '../interfaces';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.decoded) {
    try {
      const { id } = req.decoded as IDecoded;
      const user = await getRepository(User).findOne({
        where: { id },
      });
      if (!user) {
        return res.status(400).send('존재하지 않는 유저입니다.');
      }
      return res.status(200).send(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('이메일 혹은 비밀번호가 누락되었습니다.');
    }
    const userRepository = getRepository(User);
    const exUser = await userRepository.findOne({ email });
    if (exUser) {
      return res.status(400).send('해당 이메일로 가입 된 계정이 존재합니다.');
    }
    const scheduleRepository = getRepository(Schedule);
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userRepository.create({
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    await scheduleRepository.save(scheduleRepository.create({ user }));
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await getRepository(User).findOne(
      { email },
      { select: ['id', 'email', 'password'] }
    );
    if (!user) {
      return res.status(400).send('존재하지 않는 사용자입니다.');
    }

    const isPasswordMatched = await user.checkPassword(password);

    if (!isPasswordMatched) {
      return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }

    const token = signJWT(user.id);
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
