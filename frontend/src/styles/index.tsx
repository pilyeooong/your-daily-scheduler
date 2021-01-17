import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }

  body {
    background-color: #0177bb;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyle;
