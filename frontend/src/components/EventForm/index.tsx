import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import { Container, Form, Buttons } from './styles';
import { addEventAction } from '../../actions';

interface IProps {
  date: string;
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

const EventForm: React.FC<IProps> = ({
  date,
  isEventFormVisible,
  setIsEventFormVisible,
  onToggleEventModal,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    reset,
  } = useForm<IEventForm>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(async () => {
    const { content } = getValues();
    dispatch(addEventAction({ content, date }));
    setIsEventFormVisible(false);
    reset();
  }, [date, getValues, setIsEventFormVisible, reset, dispatch]);

  return (
    <Modal
      isModalVisible={isEventFormVisible}
      setIsModalVisible={setIsEventFormVisible}
    >
      <Container>
        <h2>일정 추가하기</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <select ref={register} name="AmPm">
            <option value="am">오전</option>
            <option value="pm">오후</option>
          </select>
          <input
            ref={register({ pattern: /^(0?[0-9]|1[0-2])$/ })}
            type="text"
            name="hour"
            placeholder="시"
          />
          {errors.hour?.type === 'pattern' && (
            <span>올바른 시간을 입력해 주세요</span>
          )}
          <input
            ref={register({ pattern: /^([0-5]?\d)$/ })}
            type="text"
            name="minute"
            placeholder="분"
          />
          {errors.minute?.type === 'pattern' && (
            <span>올바른 시간을 입력해 주세요</span>
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
            <button type="submit">추가</button>
            <button onClick={onToggleEventModal}>X</button>
          </Buttons>
        </Form>
      </Container>
    </Modal>
  );
};

export default EventForm;
