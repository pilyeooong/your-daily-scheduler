import React, { useState, useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Scheduler } from './styles';
import moment, { Moment } from 'moment';
import EventList from '../EventList';
import { IEvent } from '../../typings/db';
import { holidays } from '../../utils/constants';

interface IProps {
  events: IEvent[];
}

const Calendar: React.FC<IProps> = ({ events }) => {
  const [date, setDate] = useState<Moment>(moment());

  const onClickDay = useCallback(
    (date: Moment) => () => {
      setDate(date);
    },
    []
  );

  const generateCalendar = useCallback(() => {
    const startWeek = date.clone().startOf('month').week();
    const endWeek =
      date.clone().endOf('month').week() === 1
        ? 53
        : date.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = date
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(n + i, 'day');

              let isSelected =
                date.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';
              let isGrayed =
                current.format('MM') === date.format('MM') ? '' : 'grayed';
              let isEventExists = events?.find(
                (v) => v.date === current.format('YYYY-MM-DD')
              );
              let isHoliday = holidays.find(
                (v) => v.date === current.format('YYYY-MM-DD')
              );
              return (
                <div
                  className={`box  ${isSelected} ${isGrayed} 
                    ${!isGrayed && isHoliday ? 'red' : ''}
                  `}
                  key={i}
                  onClick={onClickDay(current)}
                >
                  {isEventExists ? (
                    <span className="text underline">
                      {current.format('D')}
                    </span>
                  ) : (
                    <span className="text">{current.format('D')}</span>
                  )}
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  }, [date, onClickDay, events]);

  const onClickGoBackToCurrentDate = useCallback(() => {
    const today = moment();
    setDate(today);
  }, []);

  const onClickPrevMonth = useCallback(() => {
    const prevMonth = date.clone().subtract(1, 'month');
    setDate(prevMonth);
  }, [date]);

  const onClickNextMonth = useCallback(() => {
    const nextMonth = date.clone().add(1, 'month');
    setDate(nextMonth);
  }, [date]);

  return (
    <Container>
      <Scheduler>
        <div className="head">
          <button onClick={onClickPrevMonth}>
            <MdChevronLeft />
          </button>
          <span className="title" onClick={onClickGoBackToCurrentDate}>
            {date.format('MMMM YYYY')}
          </span>
          <button onClick={onClickNextMonth}>
            <MdChevronRight />
          </button>
        </div>
        <div className="body">
          <div className="row">
            <div className="box">
              <span className="text">SUN</span>
            </div>
            <div className="box">
              <span className="text">MON</span>
            </div>
            <div className="box">
              <span className="text">TUE</span>
            </div>
            <div className="box">
              <span className="text">WED</span>
            </div>
            <div className="box">
              <span className="text">THU</span>
            </div>
            <div className="box">
              <span className="text">FRI</span>
            </div>
            <div className="box">
              <span className="text">SAT</span>
            </div>
          </div>
          {generateCalendar()}
        </div>
      </Scheduler>
      <EventList date={date.format('YYYY-MM-DD')} />
    </Container>
  );
};

export default Calendar;
