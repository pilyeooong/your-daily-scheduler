import styled from 'styled-components';

export const Container = styled.div`
  min-width: 350px;
  height: 30vh;
  background: #fff;
  border-radius: 3%;

  & .title {
    height: 10%;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 4px;
    color: #174069;
    text-align: center;
    padding-top: 1.5rem;
  }

  & .country-status {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 45%;
    padding-top: 3rem;

    & .country {
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 1px;
      margin-right: 0.5rem;
    }

    & .total-cases {
      color: #e52c0c;
      font-size: 1.2rem;
      font-weight: bold;

      & .increased-cases {
        margin-left: 8px;
        font-weight: 500;
      }
    }
  }

  & .city-status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45%;

    & .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-bottom: 3rem;

      & a {
        color: #03c75a;
      }

      & .info-message {
        text-align: center;
        font-weight: bold;
        width: 65%;
        line-height: 1.5rem;
        margin-bottom: 0.5rem;
      }
    }

    & .city-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 2rem;

      & .city {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 1px;
        margin-right: 1rem;
      }

      & .total-cases {
        color: #e52c0c;
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 1rem;

        & .increased-cases {
          margin-left: 8px;
          font-weight: 500;
        }
      }
    }
    & .data-from {
      width: 100%;
      position: relative;
      
      & .sources {
        font-size: 0.8rem;
        color: #949494;
        position: absolute;
        bottom: 5px;
        right: 0.5rem;

        @media ${(props) => props.theme.tablet} {
          bottom: 8px;
        }
      }

      & .update-time {
        font-size: 0.8rem;
        color: #949494;
        position: absolute;
        left: 10px;
        bottom: 6px;
      }
    }
  }

  @media ${(props) => props.theme.tablet} {
    height: 30vh;
    margin-left: 1.6rem;
    margin-top: 0;
  }

  @media ${(props) => props.theme.desktop} {
    width: 40%;
    margin-left: 1rem;
  }
`;
