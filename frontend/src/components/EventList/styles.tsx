import styled from 'styled-components';

export const EventListContainer = styled.div`
  /* background: #ebecf0; */
  background: #fff;
  border-radius: 3%;
  margin-top: 0.5rem;
  padding: 1rem 1rem;

  & .header {
    text-align: center;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  & .content {
    display: flex;
    flex-direction: column;
    height: 80%;
    margin-bottom: 1rem;
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

    @media ${(props) => props.theme.desktop} {
      width: 45px;
      height: 45px;
    }

    @media (min-width: 1600px) {
      width: 65px;
      height: 65px;
    }
  }

  & span {
    font-size: 1.1rem;
    font-weight: bold;
    color: gray;
    letter-spacing: 1px;
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
