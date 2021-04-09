import React, { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { googleLoginRequestAction } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

interface IProps {
  loginKeeper: boolean;
}

const Google: VFC<IProps> = ({ loginKeeper }) => {
  const dispatch = useDispatch();

  const onSuccessGoogleLogin = useCallback(
    (response: GoogleLoginResponse) => {
      dispatch(googleLoginRequestAction(response, loginKeeper));
    },
    [dispatch, loginKeeper]
  );

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID!}
      buttonText={'Login'}
      render={(props) => (
        <button
          type="button"
          onClick={props.onClick}
          disabled={props.disabled}
          style={{
            width: '100%',
            height: '44px',
            border: 'none',
            background: 'white',
            borderRadius: '3px',
            fontSize: '1rem',
            marginTop: '0.5rem',
            fontWeight: 600,
          }}
        >
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '0.4rem' }} />
          구글 로그인
        </button>
      )}
      onSuccess={onSuccessGoogleLogin}
      onFailure={console.log}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Google;
