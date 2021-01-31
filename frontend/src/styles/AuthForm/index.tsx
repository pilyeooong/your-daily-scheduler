import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 350px;
  padding: 0 2.5em;
  margin: 0 auto;

  & .link {
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
  }
`;

export const InputBox = styled.div``;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`;

export const Submit = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 0.5rem;

  & button {
    width: 100%;
    color: #fff;
    font-size: 1rem;
    background: lightgray;
    border: 1px solid lightgray;
    border-radius: 3px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  padding-bottom: 0.5rem;
`;
