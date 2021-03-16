import React, { useState, useCallback } from 'react';
import { IEvent } from '../../typings/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { EventContent, EventItem, EventTime } from './styles';
import EditEventForm from '../EditEventForm';
import { useDispatch } from 'react-redux';
import { deleteEventAction } from '../../actions';

interface IProps {
  event: IEvent;
}

const Event: React.FC<IProps> = ({ event }) => {
  const dispatch = useDispatch();
  const [isEventFormVisible, setIsEventFormVisible] = useState<boolean>(false);

  const onToggleEventModal = useCallback(() => {
    setIsEventFormVisible((prev) => !prev);
  }, []);

  const onDeleteEvent = useCallback(() => {
    const willDelete = window.confirm('정말 삭제 하시겠습니까 ?');
    if (willDelete) {
      dispatch(deleteEventAction({ id: event.id }));
    }
  }, [event]);

  return (
    <EventItem>
      <>
        {event.startTime ? (
          <EventTime>
            {new Date(event.startTime).getHours()}시{' '}
            {new Date(event.startTime).getMinutes() === 0
              ? null
              : `${new Date(event.startTime).getMinutes()}분`}{' '}
            {event.endTime ? (
              <>
                - {new Date(event.endTime).getHours()}시
                {new Date(event.endTime).getMinutes() === 0
                  ? null
                  : `${new Date(event.endTime).getMinutes()}분`}
              </>
            ) : null}
          </EventTime>
        ) : null}
      </>
      <EventContent>
        {event.content}
        <div className="event-action">
          <FontAwesomeIcon icon={faEdit} onClick={onToggleEventModal}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faTrashAlt} onClick={onDeleteEvent}></FontAwesomeIcon>
        </div>
      </EventContent>
      {isEventFormVisible ? (
        <EditEventForm
          id={event.id}
          date={moment(event.date)}
          prevStartTime={moment(event.startTime)}
          prevEndTime={moment(event.endTime)}
          prevContent={event.content}
          isEventFormVisible={isEventFormVisible}
          setIsEventFormVisible={setIsEventFormVisible}
          onToggleEventModal={onToggleEventModal}
        />
      ) : null}
    </EventItem>
  );
};

export default Event;
