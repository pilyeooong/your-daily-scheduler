import React, { useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { IEvent } from '../../typings/db';
import Event from '../Event';
import { Buttons, EventsWithTimeContainer } from './styles';

interface IProps {
  eventsWithTime: IEvent[];
  currentPage: number;
  totalResult: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const EventsWithTime: React.FC<IProps> = ({
  eventsWithTime,
  currentPage,
  setCurrentPage,
  totalResult,
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
    <EventsWithTimeContainer>
      {eventsWithTime.map((event) => (
        <Event key={event.id} event={event} />
      ))}
      <Buttons>
        {currentPage !== 1 && (
          <button className="prev-btn" onClick={onClickPreviousPage}>
            <MdChevronLeft />
          </button>
        )}
        {currentPage < totalResult && (
          <button className="next-btn" onClick={onClickNextPage}>
            <MdChevronRight />
          </button>
        )}
      </Buttons>
    </EventsWithTimeContainer>
  );
};

export default EventsWithTime;
