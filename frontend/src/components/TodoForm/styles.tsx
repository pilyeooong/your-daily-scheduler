import styled from 'styled-components';

export const FormContainer = styled.div`
  & form {
    display: flex;
    justify-content: center;
  }

  & .add-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & .submit-input {
    display: flex;
    justify-content: space-between;
    margin-right: 0.5rem;

    & input {
      padding: 0 1rem;
    }

    @media ${(props) => props.theme.tablet} {
      & input {
        padding: 0 1.3rem;
      }
    }
  }

  & .submit-button {
    & button:nth-of-type(2) {
      margin-left: 3px;
    }
  }
`;
