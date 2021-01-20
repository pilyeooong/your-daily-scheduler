import styled from 'styled-components';

export const ListContainer = styled.div`
  min-width: 350px;
  /* margin: 0 auto; */
  padding: 1rem 1rem;
  background-color: #ebecf0;
  border-radius: 3px;

  & h2 {
    font-weight: bold;
    margin-bottom: .5rem;
  }

  @media ${props => props.theme.tablet} {
    margin-left: 1.6rem; 
    margin-right: 1.8rem;
  }
  @media ${props => props.theme.desktop} {
    width: 15%;
    margin-left: 5rem; 
    margin-right: 3rem;
  }
`;