import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { Helmet } from 'react-helmet';
import { loadEventsAction, resetDoneStateOnEventAction } from '../../actions';
import { RootState } from '../../reducers';
import Calendar from '../../components/Calendar';
import Covid from '../../components/Covid';
import TodoList from '../../components/TodoList';
import Weather from '../../components/Weather';
import { ISchedule, ITodo } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import { BottomContainer, BottomLeft, LoadingContainer, TopContainer } from './styles';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);
  const eventsData = useSelector((state: RootState) => state.event.events);
  const editEventDone = useSelector((state: RootState) => state.event.editEventDone);
  const deleteEventDone = useSelector((state: RootState) => state.event.deleteEventDone);
  const { data: scheduleData } = useSWR<ISchedule>('/schedule', fetcher);
  const { data: todoData, revalidate } = useSWR<ITodo[]>(`/todos`, fetcher);

  useEffect(() => {
    if (me) {
      dispatch(loadEventsAction());
    }
  }, [me]);

  useEffect(() => {
    if (editEventDone) {
      toast.success('이벤트를 수정하였습니다 !', {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(resetDoneStateOnEventAction());
    }
  }, [editEventDone]);

  useEffect(() => {
    if (deleteEventDone) {
      toast.error('이벤트를 삭제하였습니다 !', {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(resetDoneStateOnEventAction());
    }
  }, [deleteEventDone]);

  if (!scheduleData || !todoData) {
    return (
      <>
        <Helmet>
          <title>HOME | YDS</title>
        </Helmet>
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </>
    );
  }

  return (
    <div>
      <Helmet>
        <title>HOME | YDS</title>
      </Helmet>
      <TopContainer>
        <Calendar events={eventsData} />
        <TodoList scheduleId={scheduleData.id} todos={todoData} revalidate={revalidate} />
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
