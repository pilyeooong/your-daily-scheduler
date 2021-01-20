import React from 'react';
import useSWR from 'swr';
import Calendar from '../../components/Calendar';
import Corona from '../../components/Corona';
import TodoList from '../../components/TodoList';
import Weather from '../../components/Weather';
import { IEvent, ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import { BottomContainer, BottomLeft, TopContainer } from './styles';

const Home = () => {
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);
  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos`, fetcher);
  const { data: eventsData } = useSWR<IEvent[]>('/events', fetcher);

  return (
    <div>
      <TopContainer>
        {eventsData && <Calendar events={eventsData} />}
        {scheduleData && todoData && (
          <TodoList
            scheduleId={scheduleData.id}
            todos={todoData}
            revalidate={revalidate}
          />
        )}
      </TopContainer>
      <BottomContainer>
        <BottomLeft>
          <Weather />
          <Corona />
        </BottomLeft>
      </BottomContainer>
    </div>
  );
};

export default Home;
