import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RootState } from '../reducers';
import { loadMyInfoRequest } from '../actions';

import LoggedInRouter from '../routers/Logged-in-router';
import LoggedOutRouter from '../routers/Logged-out-router';

import 'react-toastify/dist/ReactToastify.min.css';
import { Helmet } from 'react-helmet';

function App() {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, [dispatch]);

  return (
    <>
      <Helmet
        title="NodeBird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          },
          {
            name: 'description',
            content: 'Your Daily Scheduler',
          },
          {
            name: 'og:title',
            content: 'YDS',
          },
          {
            name: 'og:description',
            content: '하루 일정을 기록해 보세요 !',
          },
          {
            property: 'og:type',
            content: 'website',
          },
        ]}
      />
      {me ? <LoggedInRouter /> : <LoggedOutRouter />}
      <ToastContainer />
    </>
  );
}

export default App;
