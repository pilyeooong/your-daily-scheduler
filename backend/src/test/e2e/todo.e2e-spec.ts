import * as request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import app from '../../app';
import ConnectionOptions from '../config';

dotenv.config();

const TEST_EMAIL = 'test@test.com';
const TEST_ANOTHER_EMAIL = 'testAnother@test.com';
const TEST_PASSWORD = 'testPassword';
const TEST_CONTENT = 'testContent';
const TEST_SCHEDULE = 1;

let token: string;
let secondToken: string;

beforeAll(async () => {
  await createConnection(ConnectionOptions);
});

const agent = request.agent(app);

describe('토큰 발급', () => {
  it('유효한 정보가 전달되면 회원가입 수행 및 200 응답코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('유효한 정보가 전달되면 두번째 계정에 대한 회원가입 수행 및 200 응답코드를 반환', async (done) => {
    const res = await request(app).post('/api/user/').send({
      email: TEST_ANOTHER_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('로그인 및 토큰 발급', async (done) => {
    const res = await request(app).post('/api/user/login').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(200);
    token = res.body.token;
    agent.set('Authorization', token);
    done();
  });

  it('두번째 계정에 로그인 및 토큰 발급', async (done) => {
    const res = await request(app).post('/api/user/login').send({
      email: TEST_ANOTHER_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(200);
    secondToken = res.body.token;
    done();
  });
});

describe('GET /', () => {
  it('유효한 요청 시 200 응답코드와 본인 schedule에 속한 todos를 반환', async (done) => {
    const res = await agent.get(`/api/todos`);

    expect(res.status).toEqual(200);
    done();
  });
});

describe('POST /', () => {
  it('req.body에 content가 비어있을 시 400 에러코드를 반환', async (done) => {
    const res = await agent.post('/api/todo');
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('빈 내용은 추가 할 수 없습니다.');
    done();
  });

  it('유효한 요청일 시 schedule에 todo 추가 및 200 응답코드를 반환', async (done) => {
    const res = await agent.post('/api/todo').send({
      content: TEST_CONTENT,
      scheduleId: TEST_SCHEDULE,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('본인 schedule이 아닌 다른 곳에 todo 추가 요청 시 400 에러코드를 반환', async (done) => {
    const res = await request(app)
      .post('/api/todo')
      .send({
        content: TEST_CONTENT,
        scheduleId: TEST_SCHEDULE + 1,
      })
      .set('Authorization', token);

    expect(res.status).toEqual(403);
    expect(res.text).toEqual('본인 스케줄에만 등록 가능합니다.');
    done();
  });
});

describe('GET /:todoId', () => {
  it('본인 schedule에 속한 todo가 아닌 것을 요청할 시 400 에러코드를 반환', async (done) => {
    const res = await request(app)
      .get('/api/todo/1')
      .set('Authorization', secondToken);
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('존재하지 않는 todo 입니다.');
    done();
  });

  it('유효한 요청일 시 todo 상세정보와 200 응답코드를 반환', async (done) => {
    const res = await agent.get('/api/todo/1');
    expect(res.status).toEqual(200);
    done();
  });
});

describe('PATCH /:todoId', () => {
  it('본인 schedule에 속한 todo가 아닌 것에 대해 수정을 시도 할 시 400 에러코드를 반환', async (done) => {
    const res = await request(app)
      .patch('/api/todo/1')
      .set('Authorization', secondToken);
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('존재하지 않는 todo 입니다.');
    done();
  });

  it('유효한 요청일 시 todo를 수정, 200 응답코드를 반환', async (done) => {
    const res = await agent.patch('/api/todo/1').send({
      content: `I'm trying to edit`,
    });
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('수정 완료');
    done();
  });
});

describe('DELETE /:todoId', () => {
  it('본인 schedule에 속한 todo가 아닌 것에 대해 삭제를 시도 할 시 400 에러코드를 반환', async (done) => {
    const res = await request(app)
      .delete('/api/todo/1')
      .set('Authorization', secondToken);
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('존재하지 않는 todo 입니다.');
    done();
  });

  it('유효한 요청일 시 todo를 삭제, 200 응답코드를 반환', async (done) => {
    const res = await agent.delete('/api/todo/1');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('삭제 완료');
    done();
  });
});

afterAll(async () => {
  const connection: Connection = getConnection();
  await connection.close();
});
