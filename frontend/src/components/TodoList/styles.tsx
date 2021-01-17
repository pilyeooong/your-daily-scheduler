import styled from 'styled-components';
export const ListContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;
  padding: 1rem 1rem;
  background-color: #ebecf0;
  border-radius: 3px;

  & h2 {
    font-weight: bold;
    margin-bottom: .5rem;
  }

  @media ${props => props.theme.tablet} {
    width: 500px;
    margin: 0;
    margin-left: 2rem;
  }
  @media ${props => props.theme.desktop} {
  }
`;