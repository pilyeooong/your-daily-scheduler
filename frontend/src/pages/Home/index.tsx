import React from 'react';
import useSWR from 'swr';
import Header from '../../components/Header';
import TodoList from '../../components/TodoList';
import { ISchedule } from '../../typings/db';
import fetcher from '../../utils/fetcher';

const Home = () => {
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);

  return (
    <div>
      {scheduleData && (
        <TodoList scheduleId={scheduleData.id}/>
      )}
    </div>
  );
};

export default Home;
