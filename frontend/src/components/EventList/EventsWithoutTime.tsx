import React, { useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { IEvent } from '../../typings/db';
import Event from '../Event';
import { Buttons, EventsWithoutTimeContainer } from './styles';

interface IProps {
  eventsWithoutTime: IEvent[];
  currentPage: number;
  totalResult: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const EventsWithoutTime: React.FC<IProps> = ({
  eventsWithoutTime,
  currentPage,
  totalResult,
  setCurrentPage,
}) => {
  const onClickNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const onClickPreviousPage = useCallback(() => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return (
    <EventsWithoutTimeContainer>
      {eventsWithoutTime.map((event) => (
        <Event key={event.id} event={event} />
      ))}
      <Buttons>
        {currentPage !== 1 && (
          <button className="without-time-prev-btn" onClick={onClickPreviousPage}>
            <MdChevronLeft />
          </button>
        )}
        {currentPage < totalResult && (
          <button className="without-time-next-btn" onClick={onClickNextPage}>
            <MdChevronRight />
          </button>
        )}
      </Buttons>
    </EventsWithoutTimeContainer>
  );
};

export default EventsWithoutTime;
