import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RootState } from '../reducers';
import { loadMyInfoRequest } from '../actions';

import LoggedInRouter from '../routers/Logged-in-router';
import LoggedOutRouter from '../routers/Logged-out-router';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, [dispatch]);

  return (
    <>
      {me ? <LoggedInRouter /> : <LoggedOutRouter />}
      <ToastContainer />
    </>
  );
}

export default App;
