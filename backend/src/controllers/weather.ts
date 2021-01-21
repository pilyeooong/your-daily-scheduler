import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import cheerio = require('cheerio');

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { city } = req.body;
  const url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${encodeURIComponent(
    `${city} 날씨`
  )}`;
  try {
    const result = await axios.get(url);
    if (!result) {
      return res.status(400).send('날씨 조회 실패');
    }
    const $ = cheerio.load(result.data);

    const $todayWeather = $('div.weather_box')
      .children('div.weather_area._mainArea')
      .children('div.today_area._mainTabContent');

    const $temperature = $todayWeather.find('span.todaytemp').text();
    const $infoMessage = $todayWeather.find('p.cast_txt').text();
    // const $fineDust = $todayWeather.find('dl.indicator').toArray();

    return res.status(200).json({
      temp: $temperature,
      message: $infoMessage,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
