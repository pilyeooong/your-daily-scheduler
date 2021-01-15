import * as request from 'supertest';
import app from '../app';
import * as dotenv from 'dotenv';
import {
  Connection,
  createConnection,
  getConnection,
} from 'typeorm';
import ConnectionOptions from './config';
 
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
      email: TEST_EMAIL,
    });
    expect(res.status).toEqual(400);
    done();
  });

  it('유효한 정보가 전달되면 회원가입 수행 및 200 응답코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('이미 존재하는 이메일로 회원 가입 시도시 400 에러코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('해당 이메일로 가입 된 계정이 존재합니다.');
    done();
  });
});

describe('POST /login', () => {
  it('존재하지 않는 이메일로 로그인 시도 시 400 에러를 반환', async (done) => {
    const res = await request(app).post('/api/user/login').send({
      email: 'notExist@gmail.com',
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('존재하지 않는 사용자입니다.');
    done();
  });

  it('잘못된 비밀번호로 로그인 시 400 에러를 반환', async (done) => {
    const res = await request(app).post('/api/user/login').send({
      email: TEST_EMAIL,
      password: 'wrongPassword'
    });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('비밀번호가 일치하지 않습니다.');
    done();
  });

  it('로그인 성공 시 200 응답코드와 토큰을 발급받는다', async (done) => {
    const res = await request(app).post('/api/user/login').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    token = res.body.token;
    expect(res.status).toEqual(200);
    done();
  });
});

describe('GET /', () => {
  it('올바른 토큰일 시 내 정보와 200 응답코드를 반환', async (done) => {
    const res = await request(app).get('/api/user').set('Authorization', token);
    expect(res.status).toEqual(200);
    expect(res.body.email).toEqual(TEST_EMAIL);
    done();
  });
});

afterAll(async () => {
  const connection: Connection = getConnection();
  await connection.close();
});
