import styled from 'styled-components';

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
  margin-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
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
`;