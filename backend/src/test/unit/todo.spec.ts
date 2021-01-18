import { Request, Response } from 'express';
import typeorm = require('typeorm');
import {
  addTodo,
  deleteTodo,
  editTodo,
  loadTodos,
  switchTodoOrders,
} from '../../controllers/todo';
import Schedule from '../../entity/Schedule';
import Todo from '../../entity/Todo';
import User from '../../entity/User';

const mockRequest = (body: Object, params: Object): Request => {
  const req = {
    decoded: {
      id: 1,
    },
    body: {
      ...body,
    },
    params: {
      ...params,
    },
  } as unknown;

  return req as Request;
};

const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as unknown;

  return res as Response;
};

const req = mockRequest({}, {});
const res = mockResponse();
const next = jest.fn();

const MOCK_USER = {
  id: 1,
  email: 'test@test.com',
};

const MOCK_SCHEDULE = {
  id: 1,
  userId: 1,
};

const MOCK_TODO = {
  id: 1,
  content: 'test',
};

const MOCK_TODOS = [
  {
    id: 1,
    content: test,
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('loadTodos', () => {
  it('유저 및 스케줄이 존재하면 todos를 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE),
      find: jest.fn().mockResolvedValueOnce(MOCK_TODOS),
    });

    await loadTodos(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Todo).find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(MOCK_TODOS);
  });

  it('스케줄이 존재하지 않으면 400 에러코드와 에러메시지를 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(null),
      find: jest.fn().mockResolvedValueOnce(MOCK_TODOS),
    });

    await loadTodos(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Todo).find).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('스케줄이 존재하지 않습니다.');
  });
});

describe('switchTodoOrders', () => {
  it('기존 todo의 index를 순서를 전달 받은 switchedResult의 나열된 순서로 변경한다', async () => {
    const mockSwitchedResult = [3, 2, 1, 4, 5]; // index 3이였던 todo -> index 1이 된다.

    const req = mockRequest({ switchedResult: mockSwitchedResult }, {});
    const mockTodos = [
      { id: 1, index: 1 },
      { id: 2, index: 2 },
      { id: 3, index: 3 },
      { id: 4, index: 4 },
      { id: 5, index: 5 },
    ];
    const expectedResult = [
      { id: 1, index: 3 },
      { id: 2, index: 2 },
      { id: 3, index: 1 },
      { id: 4, index: 4 },
      { id: 5, index: 5 },
    ];

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_SCHEDULE),
      find: jest.fn().mockResolvedValue(mockTodos),
      save: jest.fn(),
    });

    await switchTodoOrders(req, res, next);
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Todo).find).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Todo).save).toHaveBeenCalledWith(
      expectedResult
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('수정 완료');
  });
});

describe('addTodo', () => {
  it('content가 존재하지 않으면 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest({}, {});
    await addTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('빈 내용은 추가 할 수 없습니다.');
  });

  it('스케줄이 존재하지 않으면 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest(
      {
        content: 'test',
        scheduleId: 1,
      },
      {}
    );

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValue(null),
    });

    await addTodo(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('스케줄이 존재하지 않습니다.');
  });

  it('본인 스케줄 외에 다른 스케줄로의 요청 시 403 에러코드와 메시지를 응답한다.', async () => {
    const mockSchedule = { id: 1 };
    const req = mockRequest(
      {
        content: 'test',
        scheduleId: 2,
      },
      {}
    );

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValue(mockSchedule),
    });

    await addTodo(req, res, next);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(Schedule).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('본인 스케줄에만 등록 가능합니다.');
  });

  it('유효한 요청일 시 todo를 생성한다.', async () => {
    const req = mockRequest(
      {
        content: 'test',
        scheduleId: 1,
      },
      {}
    );
    const expectedResult = {
      ...MOCK_TODO,
      index: 1,
    };
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE)
        .mockResolvedValueOnce(MOCK_TODO),
      create: jest.fn().mockResolvedValue(MOCK_TODO),
      save: jest.fn(),
      count: jest.fn().mockResolvedValue(1),
    });
    await addTodo(req, res, next);
    expect(typeorm.getRepository(Todo).save).toHaveBeenCalledWith(MOCK_TODO); // index 추가 전 컬럼 추가
    expect(typeorm.getRepository(Todo).save).toHaveBeenCalledWith(
      expectedResult
    ); // index 추가 된 부분까지
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(expectedResult);
  });
});

describe('editTodo', () => {
  it('content가 존재하지 않으면 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest({}, {});
    await editTodo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('빈 내용으로 수정할 수 없습니다.');
  });

  it('존재하지 않는 todo 일시 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest({ content: 'test' }, {});
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE)
        .mockResolvedValueOnce(null),
    });

    await editTodo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 todo 입니다.');
  });

  it('유효한 요청 시 해당 id에 해당하는 todo를 수정한다.', async () => {
    const MOCK_TODO = {
      id: 1,
      content: 'test',
    };

    const req = mockRequest({ content: 'test2' }, { todoId: 1 });
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE)
        .mockResolvedValueOnce(MOCK_TODO),
      save: jest.fn(),
    });

    await editTodo(req, res, next);

    expect(typeorm.getRepository(Todo).save).toHaveBeenCalledWith([
      { ...MOCK_TODO, content: 'test2' },
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('수정 완료');
  });
});

describe('deleteTodo', () => {
  it('존재하지 않는 todo 일시 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest({}, { todoId: 1 });
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE)
        .mockResolvedValueOnce(null),
    });

    await deleteTodo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 todo 입니다.');
  });

  it('유효한 요청 시 해당 id에 해당하는 todo를 삭제한다.', async () => {
    const req = mockRequest({}, { todoId: 1 });
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValueOnce(MOCK_USER)
        .mockResolvedValueOnce(MOCK_SCHEDULE)
        .mockResolvedValueOnce(MOCK_TODO),
      delete: jest.fn(),
    });

    await deleteTodo(req, res, next);

    expect(typeorm.getRepository(Todo).delete).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Todo).delete).toHaveBeenCalledWith(MOCK_TODO.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('삭제 완료');
  });
});
