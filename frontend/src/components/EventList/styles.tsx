import styled from 'styled-components';

export const EventListContainer = styled.div`
  /* max-height: 600px; */
  background: #fff;
  border-radius: 3%;
  margin-top: 0.5rem;
  padding: 1rem 1rem;

  & .header {
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${(props) => props.theme.tablet} {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  & .content {
    display: flex;
    flex-direction: column;
    height: 80%;
    margin-bottom: 1.5rem;

    @media ${(props) => props.theme.tablet} {
      margin-bottom: 2.5rem;
    }

    @media ${(props) => props.theme.desktop} {
      margin-bottom: 2rem;
    }
  }

  & .add-event {
    width: 35px;
    height: 35px;
    margin-left: auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray;
    cursor: pointer;

    @media (min-width: 1600px) {
      width: 45px;
      height: 45px;
    }
  }

  @media ${(props) => props.theme.desktop} {
    margin-top: 0;
    margin-left: 1rem;
    width: 40%;
  }

  @media ${(props) => props.theme.desktopLarge} {
    margin-top: 0;
    margin-left: 1rem;
  }
`;

export const Holiday = styled.span`
  margin-top: 0.5rem;
  padding: 0.2rem;
  border-radius: 5px;
  background: red;
  color: #fff;

  @media ${(props) => props.theme.tablet} {
    margin-top: 0;
    margin-left: 0.5rem;
  }
`;

export const NoEvents = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: gray;
  letter-spacing: 1px;
`;

export const EventsWithTimeContainer = styled.div`
  padding-top: 1rem;
  position: relative;
  height: 300px;

  @media ${(props) => props.theme.tablet} {
    height: 280px;
  }
`;

export const Buttons = styled.div`
  display: flex;

  & button {
    position: absolute;
    bottom: -1.3rem;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 2rem;

    @media ${(props) => props.theme.tablet} {
      bottom: -2.8rem;
      font-size: 2.5rem;
    }
  }

  & .prev-btn {
    left: 0;
  }

  & .next-btn {
    right: 0;
  }

  & .without-time-prev-btn {
    left: 0;
    bottom: -1.7rem;

    @media ${(props) => props.theme.tablet} {
      bottom: -2rem;
    }
  }

  & .without-time-next-btn {
    bottom: -2.3rem;
    right: 0;
  }
`;

export const EventsWithoutTimeContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  height: 140px;

  @media ${(props) => props.theme.tablet} {
    height: 150px;
  }
`;
