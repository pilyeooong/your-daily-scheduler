import styled from 'styled-components';

export const WeatherContainer = styled.div`
  min-width: 350px;
  max-width: 720px;
  height: 30vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 3%;
  margin-bottom: 1rem;

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    width: 55%;
  }

  @media ${(props) => props.theme.desktop} {
    width: 60%;
  }
`;

export const WeatherImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;

  @media ${(props) => props.theme.tablet} {
    width: 40%;
    height: 100%;
  }
`;

export const WeatherDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;

  @media ${(props) => props.theme.tablet} {
    width: 60%;
    height: 100%;
  }
`;
