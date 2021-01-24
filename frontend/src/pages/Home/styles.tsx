import styled from 'styled-components';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-left: 3rem;
  padding-right: 3rem;

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  @media ${(props) => props.theme.desktop} {
    margin-top: 2rem;
  }

  @media ${(props) => props.theme.desktopLarge} {
    padding-left: 14vw;
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  @media ${(props) => props.theme.desktopLarge} {
    padding-left: 14vw;
  }
`;

export const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  @media ${(props) => props.theme.desktop} {
    width: 75%;
  }

  @media(min-width: 1200px) and (max-width: 1299px) {
    padding-right: 8%;
  }

  @media(min-width: 1300px) and (max-width: 1399px) {
    padding-right: 6%;
  }

  @media(min-width: 1400px) and (max-width: 1499px) {
    padding-right: 2%;
  }

  @media(min-width: 1500px) and (max-width: 1599px) {
    padding-right: 1%;
  }
`;