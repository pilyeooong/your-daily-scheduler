import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment, { Moment } from 'moment';
import Modal from '../Modal';
import { Container, Form, Buttons, StartTime, EndTime, TimeError, TimeMessage } from './styles';
import { addEventAction } from '../../actions';
import HourSelects from './HourSelects';
import Button from '../Button';

interface IProps {
  date: Moment;
  isEventFormVisible: boolean;
  setIsEventFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleEventModal: () => void;
}

export interface IEventForm {
  content: string;
  AmPm: string;
  hour: string;
  minute: string;
}

export const TIME_RESET = 'TIME_RESET';
const START_TIME = 'START_TIME';
const END_TIME = 'END_TIME';
const HOUR = 'HOUR';
const MINUTE = 'MINUTE';

const EventForm: React.FC<IProps> = ({
  date,
  isEventFormVisible,
  setIsEventFormVisible,
  onToggleEventModal,
}) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<Moment | null>(null);
  const [endTime, setEndTime] = useState<Moment | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  const startTimeHourRef = useRef<HTMLSelectElement>(null);
  const startTimeMinuteRef = useRef<HTMLSelectElement>(null);
  const endTimeHourRef = useRef<HTMLSelectElement>(null);
  const endTimeMinuteRef = useRef<HTMLSelectElement>(null);

  const { register, getValues, errors, handleSubmit, reset } = useForm<IEventForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(async () => {
    if (timeError) {
      return;
    }
    if (endTime && !startTime) {
      setTimeError('시작 시간을 설정해주세요 !');
      return;
    }
    const { content } = getValues();
    dispatch(
      addEventAction({
        content,
        date: date.format('YYYY-MM-DD'),
        startTime: startTime?.toDate().toString(),
        endTime: endTime?.toDate().toString(),
      })
    );
    setIsEventFormVisible(false);
    reset();
  }, [date, timeError, startTime, endTime, getValues, setIsEventFormVisible, reset, dispatch]);

  const onChangeTime = useCallback(
    (type: string, timeType: string) => (e: React.FormEvent<HTMLSelectElement>) => {
      let timeToSet = moment(date).hour(0).minute(0).second(0);
      if (type === START_TIME) {
        if (startTime) {
          timeToSet = startTime;
        }
        if (timeType === HOUR) {
          if (e.currentTarget.value === TIME_RESET) {
            if (startTimeHourRef.current && startTimeMinuteRef.current) {
              startTimeHourRef.current.value = TIME_RESET;
              startTimeMinuteRef.current.disabled = true;
              startTimeMinuteRef.current.value = '0';
              setTimeError(null);
            }
            setStartTime(null);
            return;
          }
          if (endTime && timeToSet.clone().hour(+e.currentTarget.value) > endTime) {
            setTimeError('시작 시간이 끝나는 시간보다 늦을 수 없습니다.');
          } else {
            setTimeError(null);
          }
          setStartTime(timeToSet.hour(+e.currentTarget.value));
          if (startTimeMinuteRef.current) {
            startTimeMinuteRef.current.disabled = false;
          }
        } else {
          if (endTime && timeToSet.clone().minute(+e.currentTarget.value) > endTime) {
            setTimeError('시작 시간이 끝나는 시간보다 늦을 수 없습니다.');
          } else {
            setTimeError(null);
          }
          setStartTime(timeToSet.minute(+e.currentTarget.value));
        }
      } else {
        if (endTime) {
          timeToSet = endTime;
        }
        if (timeType === HOUR) {
          if (e.currentTarget.value === TIME_RESET) {
            if (endTimeHourRef.current && endTimeMinuteRef.current) {
              endTimeHourRef.current.value = TIME_RESET;
              endTimeMinuteRef.current.disabled = true;
              endTimeMinuteRef.current.value = '0';
              setTimeError(null);
            }
            setEndTime(null);
            return;
          }
          if (startTime && timeToSet.clone().hour(+e.currentTarget.value) < startTime) {
            setTimeError('끝나는 시간이 시작 시간보다 빠를 수 없습니다.');
          } else {
            setTimeError(null);
          }
          setEndTime(timeToSet.hour(+e.currentTarget.value));
          if (endTimeMinuteRef.current) {
            endTimeMinuteRef.current.disabled = false;
          }
        } else {
          if (startTime && timeToSet.clone().minute(+e.currentTarget.value) < startTime) {
            setTimeError('끝나는 시간이 시작 시간보다 빠를 수 없습니다.');
          } else {
            setTimeError(null);
          }
          setEndTime(timeToSet.minute(+e.currentTarget.value));
        }
      }
    },
    [startTime, endTime, date]
  );

  return (
    <Modal isModalVisible={isEventFormVisible} setIsModalVisible={setIsEventFormVisible}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StartTime>
            <h3>시작 시간</h3>
            <select ref={startTimeHourRef} onChange={onChangeTime(START_TIME, HOUR)}>
              <HourSelects />
            </select>
            <span>시</span>
            <select ref={startTimeMinuteRef} disabled onChange={onChangeTime(START_TIME, MINUTE)}>
              <option value="0">0</option>
              <option value="30">30</option>
            </select>
            <span>분</span>
          </StartTime>
          <EndTime>
            <h3>끝나는 시간</h3>
            <select ref={endTimeHourRef} onChange={onChangeTime(END_TIME, HOUR)}>
              <HourSelects />
            </select>
            <span>시</span>
            <select ref={endTimeMinuteRef} disabled onChange={onChangeTime(END_TIME, MINUTE)}>
              <option value="0">0</option>
              <option value="30">30</option>
            </select>
            <span>분</span>
          </EndTime>
          {timeError ? (
            <TimeError>{timeError}</TimeError>
          ) : (
            <TimeMessage>시간 설정을 하지 않아도 되요 !</TimeMessage>
          )}
          <input
            ref={register({ required: '내용을 입력 해주세요.' })}
            name="content"
            type="text"
            placeholder="내용을 입력해주세요"
            required
          />
          {errors.content?.message && <span>{errors.content.message}</span>}
          <Buttons>
            <Button type="submit" text={'추 가'} />
            <Button text={'취 소'} onClickAction={onToggleEventModal} color={'red'} />
          </Buttons>
        </Form>
      </Container>
    </Modal>
  );
};

export default EventForm;
