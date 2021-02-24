import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { loginRequestAction } from '../../actions';
import { RootState } from '../../reducers';
import Loading from '../../components/Loading';
import {
  Container,
  Form,
  InputBox,
  Input,
  Submit,
  ErrorMessage,
} from '../../styles/AuthForm/styles';
import KakaoLoginBtn from '../../components/SocialLogin/Kakao';

interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loadMyInfoLoading = useSelector((state: RootState) => state.user.loadMyInfoLoading);
  const loginError = useSelector((state: RootState) => state.user.loginError);

  useEffect(() => {
    if (loginError) {
      toast.error(`${loginError}`, { position: toast.POSITION.TOP_CENTER });
    }
  }, [loginError]);

  const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    const { email, password } = getValues();
    dispatch(loginRequestAction(email, password));
  }, [getValues, dispatch]);

  return (
    <Container>
      <Helmet>
        <title>LOGIN | YDS</title>
      </Helmet>
      {loadMyInfoLoading ? (
        <Loading />
      ) : (
        <>
          <Form action="" onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <Input
                ref={register({
                  required: '이메일을 입력 해주세요',
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              {errors.email?.message && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              {errors.email?.type === 'pattern' && (
                <ErrorMessage>유효한 이메일을 입력 해주세요</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <Input
                ref={register({
                  required: '패스워드를 입력 해주세요',
                  minLength: 3,
                })}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              {errors.password?.message && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              {errors.password?.type === 'minLength' && (
                <ErrorMessage>패스워드는 3자 이상 입력해주세요</ErrorMessage>
              )}
            </InputBox>
            <Submit>
              <button type="submit" className={formState.isValid ? 'clickable' : 'disabled'}>
                로그인
              </button>
            </Submit>
            <KakaoLoginBtn />
            <div className="link">
              계정이 없으신가요 ?<Link to="/signup">회원가입</Link>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Login;
