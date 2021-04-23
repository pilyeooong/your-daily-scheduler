import * as express from 'express';
import 'reflect-metadata';
import apiRouter from './routes';
import Database from './database';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as rateLimit from 'express-rate-limit';

import cron = require('node-cron');
import { getCoronaData } from './crawling/covid';

dotenv.config();

const app = express();

const database = new Database();
database.getConnection();

const prod = process.env.NODE_ENV === 'production';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 500,
});

if (prod) {
  app.use(
    cors({
      origin: 'https://yourdailyscheduler.link',
      credentials: true,
    })
  );
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
  app.set('trusty proxy', 1);
  app.use(limiter);
} else {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET!,
  })
);

app.get('/', (req, res) => {
  res.send(`working`);
});

app.use('/api', apiRouter);

cron.schedule(
  '0 */4 * * *',
  async () => {
    console.log('코로나 확진자 수 정보를 업데이트 합니다.');
    await getCoronaData();
  },
  { timezone: 'Asia/Seoul' }
);

export default app;
