import React from 'react';
import { IEvent } from '../../typings/db';
import { EventContent, EventItem, EventTime } from './styles';

interface IProps {
  event: IEvent;
}

const Event: React.FC<IProps> = ({ event }) => {
  return (
    <EventItem>
      <>
        {event.startTime ? (
          <EventTime>
            {new Date(event.startTime).getHours()}시{' '}
            {new Date(event.startTime).getMinutes() === 0
              ? null
              : `${new Date(event.startTime).getMinutes()}분`}{' '}
            - {new Date(event.endTime).getHours()}시
            {new Date(event.endTime).getMinutes() === 0
              ? null
              : `${new Date(event.endTime).getMinutes()}분`}
          </EventTime>
        ) : null}
      </>
      <EventContent>{event.content}</EventContent>
    </EventItem>
  );
};

export default Event;
