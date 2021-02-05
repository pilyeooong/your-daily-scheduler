import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { Moment } from 'moment';
import { toast } from 'react-toastify';
import { RootState } from '../../reducers';
import { IEvent } from '../../typings/db';
import { holidays } from '../../utils/constants';
import fetcher from '../../utils/fetcher';
import EventForm from '../EventForm';
import Loading from '../Loading';
import { EventListContainer, Holiday, NoEvents } from './styles';
import { resetDoneStateOnEventAction } from '../../actions';
import EventsWithTime from './EventsWithTime';
import EventsWithoutTime from './EventsWithoutTime';

interface IProps {
  date: Moment;
}

interface ILoadedEventsWithTime {
  parsedEventsWithTime: IEvent[];
  eventsWithTimeTotalPages: number;
}

interface ILoadedEventsWithoutTime {
  eventsWithoutTime: IEvent[];
  eventsWithoutTimeTotalPages: number;
}

const EventList: React.FC<IProps> = ({ date }) => {
  const dispatch = useDispatch();
  const [eventsWithoutTimePage, setEventsWithoutTimePage] = useState<number>(1);
  const [eventsWithTimePage, setEventsWithTimePage] = useState<number>(1);
  const [holidayName, setHolidayName] = useState<string | undefined>('');
  const [isEventFormVisible, setIsEventFormVisible] = useState<boolean>(false);
  const everyEvents = useSelector((state: RootState) => state.event.events);
  const addEventDone = useSelector((state: RootState) => state.event.addEventDone);

  const {
    data: eventsWithoutTimeResult,
    revalidate: eventsWithoutTimeRevalidate,
  } = useSWR<ILoadedEventsWithoutTime>(
    `/event/?date=${date.format('YYYY-MM-DD')}&page=${eventsWithoutTimePage}`,
    fetcher
  );

  const {
    data: eventsWithTimeResult,
    revalidate: eventsWithTimeRevalidate,
  } = useSWR<ILoadedEventsWithTime>(
    `/event/time/?date=${date.format('YYYY-MM-DD')}&page=${eventsWithTimePage}`,
    fetcher
  );

  useEffect(() => {
    if (addEventDone) {
      toast.success('일정을 추가하였습니다', {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(resetDoneStateOnEventAction());
    }
  }, [addEventDone]);

  useEffect(() => {
    setHolidayName(holidays.find((v) => v.date === date.format('YYYY-MM-DD'))?.name);
  }, [holidayName, date]);

  useEffect(() => {
    eventsWithoutTimeRevalidate();
    eventsWithTimeRevalidate();
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
        {(!eventsWithoutTimeResult || !eventsWithTimeResult) && <Loading />}
        {eventsWithoutTimeResult &&
        eventsWithTimeResult &&
        eventsWithoutTimeResult.eventsWithoutTime.length === 0 &&
        eventsWithTimeResult.parsedEventsWithTime.length === 0 ? (
          <NoEvents>기록 된 일정이 없습니다.</NoEvents>
        ) : (
          <>
            {eventsWithoutTimeResult && (
              <EventsWithoutTime
                eventsWithoutTime={eventsWithoutTimeResult.eventsWithoutTime}
                currentPage={eventsWithoutTimePage}
                setCurrentPage={setEventsWithoutTimePage}
                totalResult={eventsWithoutTimeResult.eventsWithoutTimeTotalPages}
              />
            )}
            {eventsWithTimeResult && (
              <EventsWithTime
                eventsWithTime={eventsWithTimeResult.parsedEventsWithTime}
                currentPage={eventsWithTimePage}
                totalResult={eventsWithTimeResult.eventsWithTimeTotalPages}
                setCurrentPage={setEventsWithTimePage}
              />
            )}
          </>
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
