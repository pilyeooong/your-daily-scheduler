import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import { Form } from './styles';
import { addEventAction } from '../../actions';

interface IProps {
  date: string;
  isEventFormVisible: boolean;
  setIsEventFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleEventModal: () => void;
}

export interface IEventForm {
  content: string;
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>일정 추가하기</h2>
        <input
          ref={register({ required: '내용을 입력 해주세요.' })}
          name="content"
          type="text"
          placeholder="내용을 입력해주세요"
          required
        />
        {errors.content?.message && <span>{errors.content.message}</span>}
        <button type="submit">추가</button>
        <button onClick={onToggleEventModal}>X</button>
      </Form>
    </Modal>
  );
};

export default EventForm;
