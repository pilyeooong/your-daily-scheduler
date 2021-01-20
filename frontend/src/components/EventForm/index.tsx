import React, { useState, useCallback, useEffect } from 'react';
import Modal from '../Modal';
import { Form } from './styles';

interface IProps {
  date: string;
  isEventFormVisible: boolean;
  setIsEventFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm: React.FC<IProps> = ({
  date,
  isEventFormVisible,
  setIsEventFormVisible
}) => {

  return (
    <Modal isModalVisible={isEventFormVisible} setIsModalVisible={setIsEventFormVisible}>
      <Form>

      </Form>
    </Modal>
  );
};

export default EventForm;
