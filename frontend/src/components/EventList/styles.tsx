import styled from 'styled-components';

export const EventListContainer = styled.div`

  background: #ebecf0;
  border-radius: 3%;
  margin-top: 1rem;
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
  }


  @media ${props => props.theme.desktop} {
    margin-top: 0;
    margin-left: 1rem;
    width: 45%;
  }

  @media ${props => props.theme.desktopLarge} {
    margin-top: 0;
    margin-left: 1rem;
    width: 50%;
  }
`;