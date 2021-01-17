import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../../actions';
import { RootState } from '../../reducers';

import { Container } from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  return (
    <Container>
      <div className="logo">
        <span className="header__link">TODOOOOOO</span>
      </div>
      {me && (
        <div className="logout" onClick={onClickLogout}>
          <span className="header__link">
            로그아웃
          </span>
        </div>
      )}
    </Container>
  );
};

export default Header;
