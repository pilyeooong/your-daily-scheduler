import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { loadEventsAction } from '../../actions';
import { RootState } from '../../reducers';
import Calendar from '../../components/Calendar';
import Covid from '../../components/Covid';
import TodoList from '../../components/TodoList';
import Weather from '../../components/Weather';
import { ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import { BottomContainer, BottomLeft, LoadingContainer, TopContainer } from './styles';
import Loading from '../../components/Loading';

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

  if (!scheduleData || !todoData) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <div>
      <TopContainer>
        <Calendar events={eventsData} />
        <TodoList
          scheduleId={scheduleData.id}
          todos={todoData}
          revalidate={revalidate}
        />
      </TopContainer>
      <BottomContainer>
        <BottomLeft>
          <Weather />
          <Covid />
        </BottomLeft>
      </BottomContainer>
    </div>
  );
};

export default Home;
