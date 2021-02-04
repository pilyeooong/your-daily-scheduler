import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { Moment } from 'moment';
import { RootState } from '../../reducers';
import { IEvent } from '../../typings/db';
import { holidays } from '../../utils/constants';
import fetcher from '../../utils/fetcher';
import Event from '../Event';
import EventForm from '../EventForm';
import Loading from '../Loading';
import { EventListContainer, Holiday, NoEvents } from './styles';

interface IProps {
  date: Moment;
}

const EventList: React.FC<IProps> = ({ date }) => {
  const [holidayName, setHolidayName] = useState<string | undefined>('');
  const [isEventFormVisible, setIsEventFormVisible] = useState<boolean>(false);
  const everyEvents = useSelector((state: RootState) => state.event.events);

  const { data: events, revalidate } = useSWR<IEvent[]>(
    `/event/?date=${date.format('YYYY-MM-DD')}`,
    fetcher
  );

  useEffect(() => {
    setHolidayName(holidays.find((v) => v.date === date.format('YYYY-MM-DD'))?.name);
  }, [holidayName, date]);

  useEffect(() => {
    revalidate();
  }, [everyEvents]);

  const onToggleEventModal = useCallback(() => {
    setIsEventFormVisible((prev) => !prev);
  }, []);

  return (
    <EventListContainer>
      <div className="header">
        {date.format('YYYY-MM-DD')}
        {holidayName && <Holiday>{holidayName}</Holiday>}
      </div>
      <div className="content">
        {!events && <Loading />}
        {events?.length === 0 ? (
          <NoEvents>기록 된 일정이 없습니다.</NoEvents>
        ) : (
          events?.map((event) => <Event key={event.id} event={event} />)
        )}
      </div>
      <div className="add-event" onClick={onToggleEventModal}>
        +
      </div>
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
