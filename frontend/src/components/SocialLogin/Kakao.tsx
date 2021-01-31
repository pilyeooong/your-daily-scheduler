import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLoginRequestAction } from '../../actions';
import KakaoLogin from 'react-kakao-login';

const Kakao = () => {
  const dispatch = useDispatch();

  const onSuccessKakaoLogin = async (result: Object) => {
    dispatch(kakaoLoginRequestAction(result));
  };

  return (
    <KakaoLogin
      token={process.env.REACT_APP_KAKAO_ID!}
      onSuccess={(res) => onSuccessKakaoLogin(res)}
      onFail={console.log}
      style={{
        width: '100%',
        height: '36px',
        background: 'rgb(254, 234, 2)',
        border: 'none',
        borderRadius: '3px',
        font: '1.2rem',
      }}
    >
      카카오톡 로그인
    </KakaoLogin>
  );
};

export default Kakao;
