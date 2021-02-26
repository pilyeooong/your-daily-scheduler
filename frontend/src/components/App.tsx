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
      <Helmet>
        <title>YOUR DAILY SCHEDULER</title>
        <meta property="og:title" content={'YOUR DAILY SCHEDULER'} />
        <meta name="description" content={'하루 일정을 기록해 보세요 !'} />
      </Helmet>
      {me ? <LoggedInRouter /> : <LoggedOutRouter />}
      <ToastContainer />
    </>
  );
}

export default App;
