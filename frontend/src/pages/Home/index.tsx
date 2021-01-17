import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { logoutRequestAction } from '../../actions';
import TodoList from '../../components/TodoList';
import { ISchedule } from '../../typings/db';
import fetcher from '../../utils/fetcher';

const Home = () => {
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);

  return (
    <div>
      Home
      {scheduleData && (
        <TodoList scheduleId={scheduleData.id}/>
      )}
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
};

export default Home;
