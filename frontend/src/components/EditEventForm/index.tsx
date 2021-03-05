import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment, { Moment } from 'moment';
import Modal from '../Modal';
import {
  Container,
  Form,
  Buttons,
  StartTime,
  EndTime,
  TimeError,
  TimeMessage,
} from '../EventForm/styles';
import Button from '../Button';
import { editEventAction } from '../../actions';

interface IProps {
  id: number;
  date: Moment;
  prevStartTime: Moment;
  prevEndTime: Moment;
  isEventFormVisible: boolean;
  setIsEventFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleEventModal: () => void;
  prevContent: string;
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

const EditEventForm: React.FC<IProps> = ({
  id,
  date,
  prevStartTime,
  prevEndTime,
  isEventFormVisible,
  setIsEventFormVisible,
  onToggleEventModal,
  prevContent,
}) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<Moment | null>(prevStartTime);
  const [endTime, setEndTime] = useState<Moment | null>(prevEndTime);
  const [timeError, setTimeError] = useState<string | null>(null);

  const startTimeHourRef = useRef<HTMLSelectElement>(null);
  const startTimeMinuteRef = useRef<HTMLSelectElement>(null);
  const endTimeHourRef = useRef<HTMLSelectElement>(null);
  const endTimeMinuteRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (startTimeMinuteRef.current) {
      if (startTime?.isValid()) {
        startTimeMinuteRef.current.disabled = false;
      }
    }
    if (endTimeMinuteRef.current) {
      if (endTime?.isValid()) {
        endTimeMinuteRef.current.disabled = false;
      }
    }
  }, []);

  const { register, getValues, errors, handleSubmit, reset } = useForm<IEventForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(async () => {
    if (timeError) {
      return;
    }
    if (startTime && !endTime) {
      setTimeError('끝나는 시간을 설정해주세요 !');
      return;
    }
    if (endTime && !startTime) {
      setTimeError('시작 시간을 설정해주세요 !');
      return;
    }
    const { content } = getValues();
    console.log(startTime?.toDate());
    console.log(endTime?.toDate());
    dispatch(
      editEventAction({
        id,
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
        if (startTime?.isValid()) {
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
        if (endTime?.isValid()) {
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
            <select
              ref={startTimeHourRef}
              defaultValue={startTime?.hour().toString()}
              onChange={onChangeTime(START_TIME, HOUR)}
            >
              <option value={TIME_RESET}>----</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
            <span>시</span>
            <select
              ref={startTimeMinuteRef}
              defaultValue={startTime?.minute().toString()}
              disabled
              onChange={onChangeTime(START_TIME, MINUTE)}
            >
              <option value="0">0</option>
              <option value="30">30</option>
            </select>
            <span>분</span>
          </StartTime>
          <EndTime>
            <h3>끝나는 시간</h3>
            <select
              ref={endTimeHourRef}
              defaultValue={endTime?.hour().toString()}
              onChange={onChangeTime(END_TIME, HOUR)}
            >
              <option value={TIME_RESET}>----</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
            <span>시</span>
            <select
              ref={endTimeMinuteRef}
              defaultValue={endTime?.minute().toString()}
              disabled
              onChange={onChangeTime(END_TIME, MINUTE)}
            >
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
            defaultValue={prevContent}
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

export default EditEventForm;
