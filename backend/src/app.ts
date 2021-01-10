import * as express from 'express';
import 'reflect-metadata';
import apiRouter from './routes';
import Database from './database';

const app = express();

const database = new Database();
database.getConnection();

app.use('/api', apiRouter);

app.listen(4000, () => {
  console.log('server is running on port 4000');
});
