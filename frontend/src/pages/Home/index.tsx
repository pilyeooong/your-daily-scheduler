import React from 'react';
import useSWR from 'swr';
import TodoList from '../../components/TodoList';
import { ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';

const Home = () => {
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);
  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos`, fetcher);

  return (
    <div>
      {scheduleData && todoData && (
        <TodoList
          scheduleId={scheduleData.id}
          todos={todoData}
          revalidate={revalidate}
        />
      )}
    </div>
  );
};

export default Home;
