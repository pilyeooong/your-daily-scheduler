import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User, { City } from '../entity/User';
import Schedule from '../entity/Schedule';
import { signJWT } from './jwt';
import { IDecoded, IKakaoInfo, IKakaoLoginResult } from '../interfaces';
import axios, { AxiosResponse } from 'axios';

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
    return res.status(201).send(user);
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
    const { email, password, loginKeeper } = req.body;

    console.log('첵첵', req.body);
    const user = await getRepository(User).findOne(
      { email },
      { select: ['id', 'email', 'password', 'city'] }
    );
    if (!user) {
      return res.status(400).send('존재하지 않는 사용자입니다.');
    }

    const isPasswordMatched = await user.checkPassword(password);

    if (!isPasswordMatched) {
      return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }

    const token = signJWT(user.id, loginKeeper);
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const { password, city } = req.body;
    let hashedPassword;
    const user = await getRepository(User).findOne(
      { id: userId },
      { select: ['id', 'email', 'password', 'city'] }
    );

    if (!user) {
      return res.status(400).send('존재하지 않는 사용자입니다.');
    }

    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    if (!(city in City)) {
      return res.status(400).send('등록 가능한 지역이 아닙니다.');
    }

    await getRepository(User).save([
      {
        id: userId,
        ...(password && { password: hashedPassword }),
        ...(city && { city: city === 'reset' ? null : city }),
      },
    ]);

    const updatedUser = await getRepository(User).findOne({ id: userId });

    return res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const kakaoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { response, profile }: IKakaoLoginResult = req.body;

    const kakao: AxiosResponse<IKakaoInfo> = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      { headers: { Authorization: `Bearer ${response.access_token}` } }
    );

    if (kakao.data.kakao_account.email === profile.kakao_account.email) {
      const userRepository = getRepository(User);

      const exUser = await userRepository.findOne({
        where: { email: profile.kakao_account.email },
      });

      const hashedPassword = await bcrypt.hash(
        Math.random().toString(36).substring(2, 15),
        12
      );

      if (!exUser) {
        const newUser = await userRepository.create({
          email: profile.kakao_account.email,
          password: hashedPassword,
          provider: 'kakao',
        });
        await userRepository.save(newUser);
        const scheduleRepository = getRepository(Schedule);
        await scheduleRepository.save(
          scheduleRepository.create({ user: newUser })
        );

        const token = signJWT(newUser.id);
        return res.status(200).json({ token, user: newUser });
      }

      const token = signJWT(exUser.id);

      return res.status(200).json({ token, user: exUser });
    }
    return res.status(400).send('올바른 토큰이 아닙니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
