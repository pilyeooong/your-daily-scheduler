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
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;

    & a {
      margin-left: 10px;
      font-weight: 700;
    }
  }

  @media ${(props) => props.theme.tablet} {
    width: 550px;
  }
`;

export const InputBox = styled.div``;

export const LoginKeeper = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;

  & input {
    transform: scale(1.5);
  }

  & label {
    padding-top: 2.5px;
    margin-left: 5px;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 0.55rem;
  padding: 0.5rem;

  @media ${(props) => props.theme.tablet} {
    padding: 1rem;
    height: 3rem;
    margin-bottom: 0.75rem;
  }
`;

export const Submit = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 0.5rem;

  & button {
    width: 100%;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  & button.disabled {
    background: lightgray;
  }

  & button.clickable {
    background: black;
  }

  @media ${(props) => props.theme.tablet} {
    height: 44px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  padding-bottom: 0.5rem;
`;
