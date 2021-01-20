import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  @media ${props => props.theme.tablet} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  @media ${props => props.theme.desktopLarge} {
    padding-left: 11rem;
  }
`;