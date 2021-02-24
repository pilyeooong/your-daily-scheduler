import styled from 'styled-components';

export const SelectCity = styled.select`
  width: 100%;
  height: 36px;
  border-radius: 3px;
  margin-bottom: 0.55rem;
  padding-left: 0.5rem;

  & option {
    padding: 1rem;
  }

  @media ${(props) => props.theme.tablet} {
    margin-bottom: 0.75rem;
  }
`;
