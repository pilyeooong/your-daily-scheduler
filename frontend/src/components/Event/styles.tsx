import styled from 'styled-components';

export const EventItem = styled.div`
  margin-bottom: 0.5rem;
`;

export const EventTime = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  background: #026aa7;
  font-size: 1rem;
  letter-spacing: 1px;
  color: #fff;
  margin-top: 0.5rem;
  margin-bottom: 0.4rem;
  text-align: center;
`;

export const EventContentContainer = styled.div``;

export const EventContent = styled.div`
  display: flex;
  background-color: #fafafa;
  border-radius: 3px;
  box-shadow: 0px 1px 5px 1.5px rgba(9, 30, 66, 0.25);
  min-height: 20px;
  text-decoration: none;
  padding: 0.7rem;
  cursor: pointer;

  & .event-action {
    display: none;
    margin-left: auto;

    & svg:nth-of-type(2) {
      margin-left: 5px;
    }
  }

  &:hover {
    & .event-action {
      display: block;
    }
  }
`;
