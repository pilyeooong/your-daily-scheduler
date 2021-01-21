import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { loadEventsAction } from '../../actions';
import { RootState } from '../../reducers';
import Calendar from '../../components/Calendar';
import Corona from '../../components/Corona';
import TodoList from '../../components/TodoList';
import Weather from '../../components/Weather';
import { ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import { BottomContainer, BottomLeft, TopContainer } from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);
  const eventsData = useSelector((state: RootState) => state.event.events);
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);
  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos`, fetcher);

  useEffect(() => {
    if (me) {
      dispatch(loadEventsAction());
    }
  }, [dispatch, me]);

  return (
    <div>
      <TopContainer>
        <Calendar events={eventsData} />
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
