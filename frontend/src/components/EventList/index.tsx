import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { RootState } from '../../reducers';
import { IEvent } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import Event from '../Event';
import EventForm from '../EventForm';
import Loading from '../Loading';
import { EventListContainer } from './styles';

interface IProps {
  date: string;
}

const EventList: React.FC<IProps> = ({ date }) => {
  const [isEventFormVisible, setIsEventFormVisible] = useState<boolean>(false);
  const everyEvents = useSelector((state: RootState) => state.event.events);

  const { data: events, revalidate } = useSWR<IEvent[]>(
    `/event/?date=${date}`,
    fetcher
  );

  useEffect(() => {
    revalidate();
  }, [everyEvents, revalidate]);

  const onToggleEventModal = useCallback(() => {
    setIsEventFormVisible((prev) => !prev);
  }, []);

  return (
    <EventListContainer>
      <div className="header">{date}</div>
      <div className="content">
        {!events && <Loading />}
        {events?.length === 0 ? (
          <span>기록 된 일정이 없습니다.</span>
        ) : (
          events?.map((event) => <Event event={event} />)
        )}
      </div>
      <div className="add-event" onClick={onToggleEventModal}>+</div>
      {isEventFormVisible ? (
        <EventForm
          date={date}
          isEventFormVisible={isEventFormVisible}
          setIsEventFormVisible={setIsEventFormVisible}
          onToggleEventModal={onToggleEventModal}
        />
      ) : null}
    </EventListContainer>
  );
};

export default EventList;
