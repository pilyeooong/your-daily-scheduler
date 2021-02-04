import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLoginRequestAction } from '../../actions';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

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
        height: '44px',
        background: 'rgb(254, 234, 2)',
        border: 'none',
        borderRadius: '3px',
        fontSize: '1rem',
        fontWeight: 600,
      }}
    >
      <LoginButton>
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
        <LoginButton>카카오톡으로 로그인</LoginButton>
      </LoginButton>
    </KakaoLogin>
  );
};

export default Kakao;

export const LoginButton = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
`;
