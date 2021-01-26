import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../reducers';
import { cities } from '../../utils/constants';
import { updateProfileRequestAction } from '../../actions';

interface IProfileForm {
  email: string;
  password: string;
  passwordCheck: string;
  city: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);
  const { register, getValues, errors, handleSubmit } = useForm<IProfileForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    const { email, password, passwordCheck, city } = getValues();

    dispatch(updateProfileRequestAction(getValues()));
  }, [getValues, dispatch]);

  return (
    <div>
      {!me ? null : (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register()}
            name="email"
            type="text"
            disabled
            defaultValue={me.email}
            placeholder="이메일"
          />
          <input ref={register()} name="password" type="text" placeholder="새 비밀번호" />
          <input ref={register()} name="passwordCheck" type="text" placeholder="새 비밀번호 확인" />
          <select ref={register} name="city" defaultValue={me.city}>
            <option>-------</option>
            {cities.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <button type="submit">수정</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
