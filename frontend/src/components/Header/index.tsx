import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { logoutRequestAction } from '../../actions';
import { RootState } from '../../reducers';

import { Container } from './styles';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const me = useSelector((state: RootState) => state.user.me);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
    history.push('/');
  }, [dispatch, history]);

  useEffect(() => {
    if (me) {
      if (me.is_admin) {
        setIsAdmin(true);
      }
    }
  }, [me]);

  const onClickRefreshCovid = useCallback(async () => {
    try {
      await axios.get('/covid/refresh', {
        headers: { Authorization: `${localStorage.getItem('jwtToken')}` },
      });
      toast.success(`코로나 정보를 업데이트 합니다`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        history.go(0);
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('코로나 정보 업데이트에 실패 하였습니다', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  return (
    <Container>
      <div className="logo">
        <Link to="/" className="header__link">
          DAILY SCHEDULER
        </Link>
      </div>
      {me && (
        <>
          {isAdmin && (
            <div className="refresh-covid-data margin">
              <span className="header__link" onClick={onClickRefreshCovid}>
                코로나
              </span>
            </div>
          )}
          <div className={!isAdmin ? 'margin' : ''}>
            <Link to="/profile" className="header__link">
              프로필
            </Link>
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
