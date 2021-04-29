import { ConnectionOptions } from 'typeorm';
import entities from '../entity';

import * as dotenv from 'dotenv';

dotenv.config();

const ConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TEST_DATABASE,
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities,
};

export default ConnectionOptions;
