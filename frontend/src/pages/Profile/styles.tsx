import styled from 'styled-components';

export const SelectCity = styled.select`
  width: 100%;
  height: 36px;
  border-radius: 3px;
  margin-bottom: 0.55rem;

  & option {
    font-weight: bold;
  }

  @media ${(props) => props.theme.tablet} {
    margin-bottom: 0.75rem;
  }
`;
