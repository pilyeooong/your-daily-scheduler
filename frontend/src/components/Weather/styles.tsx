import styled from 'styled-components';

export const WeatherContainer = styled.div`
  min-width: 350px;
  max-width: 720px;
  box-sizing: border-box;
  height: 30vh;
  /* background: #ebecf0; */
  background: #fff;
  border-radius: 3%;
  margin-bottom: 1rem;

  @media ${props => props.theme.tablet} {
    width: 55%;
  }

  @media ${props => props.theme.desktop} {
    width: 60%;
  }
`;