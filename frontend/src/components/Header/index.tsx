import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutRequestAction } from '../../actions';
import { RootState } from '../../reducers';

import { Container } from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const me = useSelector((state: RootState) => state.user.me);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
    history.push('/');
  }, [dispatch, history]);

  return (
    <Container>
      <div className="logo">
        <Link to="/" className="header__link">DAILY SCHEDULER</Link>
      </div>
      {me && (
        <>
          <div className="profile">
            <Link to='/profile' className="header__link">프로필</Link>
          </div>
          <div className="logout" onClick={onClickLogout}>
            <span className="header__link">로그아웃</span>
          </div>
        </>
      )}
    </Container>
  );
};

export default Header;
