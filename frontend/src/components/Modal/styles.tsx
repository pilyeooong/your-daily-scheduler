import styled from 'styled-components';

export const ModalContainer = styled.div`
  @keyframes modal-ani {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 5;
    }

    100% {
      opacity: 10;
    }
  }
  display: none;
  transition: all ease 1s 0s;
  animation: modal-ani 2s alternate;
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

export const ModalBox = styled.div`
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
