import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: none;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  height: 350px;
  padding: 18px 20px 20px;
  background: white;
  border-radius: 15px;
  z-index: 100;
`;

export const Form = styled.form``;
