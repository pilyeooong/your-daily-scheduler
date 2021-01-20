import React from 'react';
import useSWR from 'swr';
import Calendar from '../../components/Calendar';
import TodoList from '../../components/TodoList';
import { IEvent, ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import { Container } from './styles';

const Home = () => {
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);
  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos`, fetcher);
  const { data: eventsData } = useSWR<IEvent[]>('/events', fetcher);

  return (
    <Container>
      {scheduleData && todoData && (
        <TodoList
          scheduleId={scheduleData.id}
          todos={todoData}
          revalidate={revalidate}
        />
      )}
      {eventsData && <Calendar events={eventsData}/>}
    </Container>
  );
};

export default Home;
