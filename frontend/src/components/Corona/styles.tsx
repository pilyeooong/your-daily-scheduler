import styled from 'styled-components';

export const Container = styled.div`
  min-width: 350px;
  height: 30vh;
  /* background: #ebecf0; */
  background: #fff;
  border-radius: 3%;

  @media ${props => props.theme.tablet} {
    margin-left: 1.6rem; 
    margin-top: 0;
  }

  @media ${props => props.theme.desktop} {
    width: 40%;
    margin-left: 1rem;
  }
`;
