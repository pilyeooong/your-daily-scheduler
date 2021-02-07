import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Form = styled.form`
  height: 100%;
  padding-top: 2rem;

  & h3 {
    text-align: center;
    color: gray;
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  & select {
    padding: 5px;
  }
  & select:nth-of-type(1) {
    margin-right: 1rem;
  }

  & input {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
  }
`;

export const TimeError = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: red;
  padding: 0 0 10px 0;
`;

export const TimeMessage = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 0 0 10px 0;
`;

export const StartTime = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const EndTime = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  & button:nth-of-type(2) {
    margin-left: 3px;
  }
`;
