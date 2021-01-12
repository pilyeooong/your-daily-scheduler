import * as request from 'supertest';
import app from '../app';
import * as dotenv from 'dotenv';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
} from 'typeorm';
import entities from '../entity';

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

beforeAll(async () => {
  await createConnection(ConnectionOptions);
});

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'testPassword';

let token: string;

describe('POST /', () => {
  it('이메일 누락시 400 에러 코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(400);
    done();
  });

  it('비밀번호 누락시 400 에러 코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_EMAIL
    });
    expect(res.status).toEqual(400);
    done();
  });

  it('유효한 정보가 전달되면 회원가입 수행 및 200 응답코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(200);
    done();
  });
});

describe('POST /login', () => {
  it('로그인 성공 시 200 응답코드와 토큰을 발급받는다', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    token = res.body.token;
    expect(res.status).toEqual(200);
  });
});

describe('GET /', () => {
  it('올바른 토큰일 시 내 정보와 200 응답코드를 반환', async () => {
    const res = await request(app).get('/api/user').set('Authorization', token);
    expect(res.status).toEqual(200);
    expect(res.body.email).toEqual(TEST_EMAIL);
  })
})

afterAll(async () => {
  const connection: Connection = getConnection();
  await connection.close();
});
