import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { signUpRequestAction } from '../../actions';
import { RootState } from '../../reducers';
import { Container, Form, Input, InputBox, Submit } from '../../styles/AuthForm/styles';
import KakaoLoginBtn from '../../components/SocialLogin/Kakao';
import Loading from '../../components/Loading';

interface ISignUpForm {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const me = useSelector((state: RootState) => state.user.me);
  const loadMyInfoLoading = useSelector((state: RootState) => state.user.loadMyInfoLoading);
  const signUpDone = useSelector((state: RootState) => state.user.signUpDone);
  const signUpError = useSelector((state: RootState) => state.user.signUpError);
  const { register, getValues, errors, handleSubmit, formState } = useForm<ISignUpForm>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (me) {
      history.replace('/');
    }
  }, [history, me]);

  useEffect(() => {
    if (signUpDone) {
      history.push('/');
    }
  }, [history, signUpDone]);

  const onSubmit = () => {
    const { email, password } = getValues();
    dispatch(signUpRequestAction(email, password));
  };

  if (loadMyInfoLoading) {
    return null;
  }

  return (
    <Container>
      <Helmet>
        <title>SIGN UP | YDS</title>
      </Helmet>
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
            {errors.email?.message && <span>{errors.email.message}</span>}
            {errors.email?.type === 'pattern' && <span>유효한 이메일을 입력 해주세요</span>}
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
            {errors.password?.message && <span>{errors.password.message}</span>}
            {errors.password?.type === 'minLength' && <span>패스워드는 3자 이상 입력해주세요</span>}
          </InputBox>
          <Submit>
            <button type="submit" className={formState.isValid ? 'clickable' : 'disabled'}>
              회원가입
            </button>
          </Submit>
          {signUpError && <span>{signUpError}</span>}
          <KakaoLoginBtn />
          <div className="link">
            계정이 이미 있으신가요 ? <Link to="/">로그인</Link>
          </div>
        </Form>
      </>
    </Container>
  );
};

export default SignUp;
