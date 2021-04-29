import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getCoronaData } from '../crawling/covid';
import Covid from '../entity/Covid';
import User from '../entity/User';
import { IDecoded } from '../interfaces';

export const loadCovidStatusData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.decoded as IDecoded;
    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send('사용자가 존재하지 않습니다.');
    }

    const covidRepo = await getRepository(Covid);

    let cityStatus;
    if (user.city) {
      cityStatus = await covidRepo.findOne({ where: { city: user.city } });
    }

    const wholeCountryStatus = await covidRepo.findOne({
      where: { city: '전국' },
    });

    return res.status(200).json({ wholeCountryStatus, cityStatus });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const refreshCovidData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.decoded as IDecoded;
    const user = await getRepository(User).findOne({ where: { id } });
    if (!user) {
      return res.status(400).send('사용자가 존재하지 않습니다.');
    }

    if (!user.is_admin) {
      return res.status(403).send('권한이 없습니다.');
    }

    await getCoronaData();

    return res.status(200).send('업데이트 완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
