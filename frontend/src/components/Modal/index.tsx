import React, { useRef, useCallback, useEffect } from 'react';
import { ModalContainer, Background, ModalBox } from './styles';

interface IProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({
  isModalVisible,
  setIsModalVisible,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalVisible && modalRef.current) {
      modalRef.current.style.display = 'block';
    } else {
      if (modalRef.current) {
        modalRef.current.style.display = 'none';
      }
    }
  }, [isModalVisible]);

  const onBackgroundClicked = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  return (
    <ModalContainer ref={modalRef}>
      <Background onClick={onBackgroundClicked}></Background>
      <ModalBox>{children}</ModalBox>
    </ModalContainer>
  );
};

export default Modal;
