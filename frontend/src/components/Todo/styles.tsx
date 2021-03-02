import styled from 'styled-components';

export const TodoItem = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 8px;
  max-width: 325px;
  min-height: 20px;
  text-decoration: none;
  padding: 0.7rem;
  cursor: pointer;
  display: flex;
  position: relative;

  & .todo-action {
    display: none;
    margin-left: auto;

    & svg {
      height: 80%;
    }

    & svg:nth-child(2) {
      margin-left: 0.5rem;
    }
  }

  &:hover {
    & .todo-action {
      display: block;
    }
  }
`;

export const EditForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;

  & input {
    padding: 0.3rem 1rem;
    width: 70%;
    border-color: gray;
    border-radius: 3px;
  }
  & .edit-form-buttons {
    margin-left: auto;
    & button {
      border: none;
      background: dodgerblue;
      padding: 0.25rem;
      color: #fff;
      font-weight: bold;
      letter-spacing: 1px;
      border-radius: 3px;
    }
    & button:nth-of-type(2) {
      background: red;
      margin-left: 5px;
    }
  }
`;
