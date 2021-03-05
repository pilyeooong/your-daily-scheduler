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
        <div className="btn-box">
          <button className={currentPage === 1 ? 'hide' : ''} onClick={onClickPreviousPage}>
            <MdChevronLeft />
          </button>
        </div>
        <div className="btn-box right">
          <button className={currentPage >= totalResult ? 'hide' : ''} onClick={onClickNextPage}>
            <MdChevronRight />
          </button>
        </div>
      </Buttons>
    </EventsWithoutTimeContainer>
  );
};

export default EventsWithoutTime;
