import typeorm = require('typeorm');
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { editProfile, getMe, googleLogin, kakaoLogin, login, signUp } from '../../controllers/user';
import User, { City } from '../../entity/User';
import { mockRequest, mockResponse } from '../mock';
import Schedule from '../../entity/Schedule';
import jwt from '../../controllers/jwt';

jest.spyOn(console, 'error').mockImplementation();
jest.mock('bcrypt');

const ERROR = new Error();

afterEach(() => {
  jest.clearAllMocks();
});

describe('getMe', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = jest.fn();
  it('유효한 토큰이나, 유저 정보가 존재 하지 않을 시 400 에러코드와 메시지를 응답한다.', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
    });

    await getMe(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith('존재하지 않는 유저입니다.');
  });

  it('유효한 토큰이며, 유저 정보가 존재 할 시 응답 코드와 유저 정보를 응답한다.', async () => {
    const MOCK_USER = { id: 1 };
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_USER),
    });

    await getMe(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith(MOCK_USER);
  });

  it('getMe 로직 실행 중 에러가 발생할 시 에러 로그를 출력 및 next()를 호출 한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await getMe(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });
});

describe('signUp', () => {
  const MOCK_EMAIL = 'MOCK@test.com';
  const MOCK_PASSWORD = 'MOCKPASSWORD';

  const req = mockRequest({ email: MOCK_EMAIL, password: MOCK_PASSWORD });
  const res = mockResponse();
  const next = jest.fn();

  it('이메일 혹은 비밀번호 누락 시 400 에러코드와 메시지를 응답한다.', async () => {
    const req = mockRequest();

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('이메일 혹은 비밀번호가 누락되었습니다.');
  });

  it('가입을 시도하려는 이메일 정보가 이미 존재 할 시 에러 코드와 메시지를 응답한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue({ id: 1 }),
    });

    await signUp(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('해당 이메일로 가입 된 계정이 존재합니다.');
  });

  it('signUp 로직 실행 중 에러 발생 시 에러를 console 및 next와 호출한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await signUp(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });

  it('유효한 요청 시 전달 받은 이메일, 비밀번호로 회원 가입하고, 201 코드와 유저 정보를 응답한다', async () => {
    const MOCK_USER = { id: 1 };
    const MOCK_SCEHDULE = { id: 1 };
    const HASHED_PASSWORD = 'HASHED_PASSWORD';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(HASHED_PASSWORD);
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValueOnce(MOCK_USER).mockResolvedValue(MOCK_SCEHDULE),
      save: jest.fn().mockResolvedValue(null),
    });

    await signUp(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository).toHaveBeenCalledWith(Schedule);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({ email: MOCK_EMAIL });
    expect(bcrypt.hash).toHaveBeenCalledWith(MOCK_PASSWORD, 12);
    expect(typeorm.getRepository(User).create).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      password: HASHED_PASSWORD,
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalled();
    expect(typeorm.getRepository(Schedule).create).toHaveBeenCalledWith({ user: MOCK_USER });
    expect(typeorm.getRepository(Schedule).save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(MOCK_USER);
  });
});

describe('login', () => {
  const MOCK_EMAIL = 'MOCK@test.com';
  const MOCK_PASSWORD = 'MOCKPASSWORD';
  const MOCK_USER = { id: 1 };

  const req = mockRequest({ email: MOCK_EMAIL, MOCK_PASSWORD: MOCK_PASSWORD });
  const res = mockResponse();
  const next = jest.fn();

  it('로그인 요청 시 존재하지 않는 사용자일 경우에 에러 코드와 메시지를 응답한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
    });

    await login(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 사용자입니다.');
  });

  it('비밀번호가 일치하지 않을 시 에러 코드와 메시지를 응답한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest
        .fn()
        .mockResolvedValue({ ...MOCK_USER, checkPassword: jest.fn().mockResolvedValue(false) }),
    });

    await login(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.');
  });
  it('login 로직 중 에러 발생 시 console 및 next를 에러와 함께 호출한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await login(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });

  it('유효한 요청일 시 토큰을 발급하여, 토큰과 유저 정보를 응답한다', async () => {
    const TOKEN = 'TOKEN';
    const MOCK_RESULT = { ...MOCK_USER, checkPassword: jest.fn().mockResolvedValue(true) };

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_RESULT),
    });
    jest.spyOn(jwt, 'signJWT').mockReturnValue(TOKEN);

    await login(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(jwt.signJWT).toHaveBeenCalledWith(MOCK_USER.id, undefined);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: TOKEN,
      user: { ...MOCK_RESULT, password: null },
    });
  });
});

describe('editProfile', () => {
  const MOCK_CITY = 'MOCK_CITY';
  const MOCK_PASSWORD = 'MOCKPASSWORD';
  const MOCK_USER = { id: 1 };

  const req = mockRequest();
  const res = mockResponse();
  const next = jest.fn();

  it('수정하고자 하는 정보가 일체 존재하지 않으면 에러 코드와 메시지를 응답한다', async () => {
    await editProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('수정하시고자 하는 프로필 정보를 입력해주세요');
  });

  it('유효한 토큰이지만 유저 정보가 존재하지 않을 시 에러 코드와 메시지를 응답한다', async () => {
    const req = mockRequest({ password: MOCK_PASSWORD, city: MOCK_CITY });
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
    });

    await editProfile(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('존재하지 않는 사용자입니다.');
  });

  it('패스워드를 수정하고자 한다면, 수정하고자하는 패스워드를 hash 하여 수정하고, 바뀐 유저 정보를 저장 및 응답한다', async () => {
    const MOCK_CITY = City.서울;
    const HASHED_PASSWORD = 'HASHED_PASSWORD';

    const req = mockRequest({ password: MOCK_PASSWORD, city: MOCK_CITY });

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(HASHED_PASSWORD);
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_USER),
      save: jest.fn().mockResolvedValue(null),
    });

    await editProfile(req, res, next);

    expect(typeorm.getRepository).toHaveBeenCalledWith(User);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(MOCK_PASSWORD, 12);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith([
      { id: MOCK_USER.id, password: HASHED_PASSWORD, city: MOCK_CITY },
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(MOCK_USER);
  });

  it('editProfile 로직 실행 중 에러 발생 시 에러를 담은 console 및 next를 호출한다', async () => {
    const req = mockRequest({ city: MOCK_CITY });

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await editProfile(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });

  it('없는 도시 정보로 수정하고자 한다면 에러 코드 및 메시지를 응답한다', async () => {
    const req = mockRequest({ city: MOCK_CITY });

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_USER),
      save: jest.fn().mockResolvedValue(null),
    });

    await editProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('등록 가능한 지역이 아닙니다.');
  });
});

describe('kakaoLogin', () => {
  const MOCK_EMAIL = 'MOCK_EMAIL';
  const MOCK_LOGIN_KEEPER = false;
  const MOCK_USER = { id: 1 };
  const MOCK_RESPONSE = { access_token: 'access_token' };
  const MOCK_PROFILE = { kakao_account: { email: MOCK_EMAIL } };
  const MOCK_KAKAO_RESPONSE = { data: { kakao_account: { email: MOCK_EMAIL } } };

  const req = mockRequest({
    response: MOCK_RESPONSE,
    profile: MOCK_PROFILE,
    loginKeeper: MOCK_LOGIN_KEEPER,
  });
  const res = mockResponse();
  const next = jest.fn();

  jest.spyOn(axios, 'post').mockResolvedValue(MOCK_KAKAO_RESPONSE);

  it('이미 존재하며, 해당 로컬에 존재하는 이메일일시 에러 코드와 메시지를 응답한다', async () => {
    const MOCK_EX_USER = { ...MOCK_USER, provider: 'local' };

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_EX_USER),
    });

    await kakaoLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('해당 이메일로 생성 된 계정이 존재합니다.');
  });

  it('이미 존재하지만 소셜 로그인으로 가입 된 이메일일 시 토큰 발급 및 토큰과 유저정보를 응답한다', async () => {
    const MOCK_EX_USER = { ...MOCK_USER, provider: 'social' };
    const TOKEN = 'TOKEN';

    jest.spyOn(jwt, 'signJWT').mockReturnValue(TOKEN);
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_EX_USER),
    });

    await kakaoLogin(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(
      'https://kapi.kakao.com/v2/user/me',
      {},
      { headers: { Authorization: `Bearer ${MOCK_RESPONSE.access_token}` } }
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(jwt.signJWT).toHaveBeenCalledWith(MOCK_EX_USER.id, MOCK_LOGIN_KEEPER);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: TOKEN, user: MOCK_EX_USER });
  });

  it('kakao oauth 요청의 응답은 존재하나 이메일 불일치 시 에러 코드 및 메시지를 응답', async () => {
    const req = mockRequest({
      response: MOCK_RESPONSE,
      profile: { ...MOCK_PROFILE, kakao_account: { email: 'diff' } },
      loginKeeper: MOCK_LOGIN_KEEPER,
    });

    await kakaoLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('올바른 토큰이 아닙니다.');
  });

  it('kakaoLogin 로직 실행 중 에러 발생 시 에러를 console 및 next와 함께 호출한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await kakaoLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });

  it('유효한 요청이며, 해당 유저 정보가 존재하지 않을 시 유저 정보를 생성 및 토큰을 발급하여 응답한다', async () => {
    const HASHED_PASSWORD = 'HASHED_PASSWORD';
    const MOCK_USER = { id: 1 };
    const MOCK_SCEHDULE = { id: 1 };
    const TOKEN = 'TOKEN';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(HASHED_PASSWORD);
    jest.spyOn(jwt, 'signJWT').mockReturnValue(TOKEN);
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValueOnce(MOCK_USER).mockResolvedValue(MOCK_SCEHDULE),
      save: jest.fn().mockResolvedValue(null),
    });

    await kakaoLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(expect.any(String), 12);
    expect(typeorm.getRepository(User).create).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      password: HASHED_PASSWORD,
      provider: 'social',
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(MOCK_USER);
    expect(typeorm.getRepository(Schedule).create).toHaveBeenCalledWith({ user: MOCK_USER });
    expect(jwt.signJWT).toHaveBeenCalledWith(MOCK_USER.id, MOCK_LOGIN_KEEPER);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: TOKEN, user: MOCK_USER });
  });
});

describe('googleLogin', () => {
  const MOCK_EMAIL = 'MOCK_EMAIL';
  const MOCK_LOGIN_KEEPER = 'MOCK_LOGIN_KEEPER';
  const MOCK_LOGIN_RESULT = { email: MOCK_EMAIL };
  const MOCK_USER = { id: 1 };

  const req = mockRequest({ result: MOCK_LOGIN_RESULT, loginKeeper: MOCK_LOGIN_KEEPER });
  const res = mockResponse();
  const next = jest.fn();

  it('이미 존재하는 이메일이며, 로컬 서버에서 가입되었을 시 에러 코드와 메시지를 응답한다', async () => {
    const MOCK_EX_USER = { ...MOCK_USER, provider: 'local' };
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_EX_USER),
    });

    await googleLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('해당 이메일로 생성 된 계정이 존재합니다.');
  });

  it('이미 해당 소셜 이메일로 가입되어 있을 시, 토큰 발급 및 유저 정보를 응답한다', async () => {
    const MOCK_EX_USER = { ...MOCK_USER, provider: 'social' };
    const TOKEN = 'TOKEN';
    jest.spyOn(jwt, 'signJWT').mockReturnValue(TOKEN);
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(MOCK_EX_USER),
    });

    await googleLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(jwt.signJWT).toHaveBeenCalledWith(MOCK_EX_USER.id, MOCK_LOGIN_KEEPER);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: TOKEN, user: MOCK_EX_USER });
  });

  it('googleLogin 로직 실행 중 에러 발생 시 에러를 console 및 next와 함께 호출한다', async () => {
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockRejectedValue(ERROR),
    });

    await googleLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(ERROR);
    expect(next).toHaveBeenCalledWith(ERROR);
  });

  it('유효한 요청이며 해당 이메일로 가입 된 정보가 없을 시, 유저 생성 및 토큰을 발급하여 응답한다', async () => {
    const HASHED_PASSWORD = 'HASHED_PASSWORD';
    const TOKEN = 'TOKEN';
    const MOCK_SCEHDULE = { id: 1 };

    jest.spyOn(jwt, 'signJWT').mockReturnValue(TOKEN);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(HASHED_PASSWORD);

    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValueOnce(MOCK_USER).mockResolvedValue(MOCK_SCEHDULE),
      save: jest.fn().mockResolvedValue(null),
    });

    await googleLogin(req, res, next);

    expect(typeorm.getRepository(User).findOne).toHaveBeenCalled();
    expect(typeorm.getRepository(User).create).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      password: HASHED_PASSWORD,
      provider: 'social',
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(MOCK_USER);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(MOCK_USER);
    expect(typeorm.getRepository(Schedule).create).toHaveBeenCalledWith({ user: MOCK_USER });
    expect(typeorm.getRepository(Schedule).save).toHaveBeenCalledWith(MOCK_SCEHDULE);
    expect(jwt.signJWT).toHaveBeenCalledWith(MOCK_USER.id, MOCK_LOGIN_KEEPER);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: TOKEN, user: MOCK_USER });
  });
});
