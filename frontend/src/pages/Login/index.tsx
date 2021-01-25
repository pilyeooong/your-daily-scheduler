import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import KakaoLogin from 'react-kakao-login';
import { kakaoLoginRequestAction, loginRequestAction } from '../../actions';
import { RootState } from '../../reducers';
import Loading from '../../components/Loading';
import { LoginContainer } from './styles';

interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loadMyInfoLoading = useSelector(
    (state: RootState) => state.user.loadMyInfoLoading
  );

  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    dispatch(loginRequestAction(email, password));
  };

  const onSuccessKakaoLogin = async (result: Object) => {
    dispatch(kakaoLoginRequestAction(result));
  };

  return (
    <LoginContainer>
      {loadMyInfoLoading ? (
        <Loading />
      ) : (
        <>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              ref={register({
                required: '이메일을 입력 해주세요',
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            {errors.email?.message && <span>{errors.email.message}</span>}
            {errors.email?.type === 'pattern' && (
              <span>유효한 이메일을 입력 해주세요</span>
            )}
            <input
              ref={register({
                required: '패스워드를 입력 해주세요',
                minLength: 3,
              })}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            {errors.password?.message && <span>{errors.password.message}</span>}
            {errors.password?.type === 'minLength' && (
              <span>패스워드는 3자 이상 입력해주세요</span>
            )}
            <button type="submit">로그인</button>
          </form>
          <span>
            계정이 없으신가요 ? <Link to="/signup">회원가입</Link>
          </span>
          <KakaoLogin
            token={process.env.REACT_APP_KAKAO_ID!}
            onSuccess={(res) => onSuccessKakaoLogin(res)}
            onFail={console.log}
          >
            카카오톡 로그인
          </KakaoLogin>
        </>
      )}
    </LoginContainer>
  );
};

export default Login;
