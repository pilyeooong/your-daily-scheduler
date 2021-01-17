import styled from 'styled-components';

export const Container = styled.header`
  height: 48px;
  display: flex;
  align-items: center;
  background-color: #026aa7;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;

  & .logo {
    width: 50%;
    height: 100%;
  }

  & .logout {
    margin-left: auto;
  }

  .header__link {
    height: 32px;
    line-height: 32px;
    background-color: hsla(0, 0%, 100%, 0.3);
    color: #fff;
    margin: 0 4px 0 0;
    padding: 0.5rem;
    border-radius: 3px;
    white-space: nowrap;
  }
`;
