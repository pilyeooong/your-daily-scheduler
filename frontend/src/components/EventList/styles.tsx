import styled from 'styled-components';

export const EventListContainer = styled.div`
  background: #fff;
  border-radius: 3%;
  margin-top: 0.5rem;
  padding: 1rem 1rem;
  position: relative;

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

    @media ${(props) => props.theme.tablet} {
    }

    @media ${(props) => props.theme.desktop} {
    }
  }

  & .add-event {
    & span {
      width: 35px;
      height: 35px;
      margin-left: auto;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: lightgray;
      cursor: pointer;

      @media (min-width: 1400px) {
        width: 35px;
        height: 35px;
      }
    }

    @media (min-width: 1200px) {
      position: absolute;
      right: 1rem;
      bottom: 0.75rem;
    }

    @media (min-width: 1400px) {
      right: 1rem;
      bottom: 1.2rem;
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

export const EventsWithTimeContainer = styled.div``;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 2rem;

  @media (min-width: 1200px) {
    height: 80px;
  }

  .btn-box {
    width: 50%;
  }

  .btn-box.right {
    display: flex;
    justify-content: flex-end;
  }

  & button {
    bottom: -1.3rem;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 2rem;
  }

  & button.hide {
    display: none;
  }

  & .without-time-prev-btn {
    left: 0;
    bottom: -1.7rem;

    @media ${(props) => props.theme.tablet} {
      bottom: -2rem;
    }
  }

  & .without-time-next-btn {
    bottom: -3rem;
    right: 0;
  }
`;

export const EventsWithoutTimeContainer = styled.div`
  position: relative;
`;
