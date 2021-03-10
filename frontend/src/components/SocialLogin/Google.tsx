import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { googleLoginRequestAction } from '../../actions';

const Google = () => {
  const dispatch = useDispatch();

  const onSuccessGoogleLogin = useCallback(
    (response: GoogleLoginResponse) => {
      dispatch(googleLoginRequestAction(response));
    },
    [dispatch]
  );

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID!}
      buttonText={'Login'}
      onSuccess={onSuccessGoogleLogin}
      onFailure={console.log}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Google;
