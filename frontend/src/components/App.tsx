import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { loadMyInfoRequest } from '../actions';

import LoggedInRouter from '../routers/Logged-in-router';
import LoggedOutRouter from '../routers/Logged-out-router';

function App() {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, [dispatch]);

  return me ? <LoggedInRouter /> : <LoggedOutRouter />
}

export default App;
