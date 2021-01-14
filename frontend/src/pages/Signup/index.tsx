import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signUpRequestAction } from '../../actions';
import { RootState } from '../../reducers';

interface ISignUpForm {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signUpDone = useSelector((state: RootState) => state.user.signUpDone);
  const signUpError = useSelector((state: RootState) => state.user.signUpError);
  const { register, getValues, errors, handleSubmit } = useForm<ISignUpForm>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    dispatch(signUpRequestAction(email, password));
  };

  useEffect(() => {
    if (signUpDone) {
      history.push('/');
    }
  }, [history, signUpDone]);

  return (
    <div>
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
        <button type="submit">회원가입</button>
      </form>
      {signUpError && <span>{signUpError}</span>}
    </div>
  );
};

export default SignUp;
