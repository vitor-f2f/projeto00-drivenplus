import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:focus { text-decoration: none; }
    a:active { text-decoration: none; }
    a { 
        color: inherit;
        text-decoration: none;
    }	
`;

export default GlobalStyle;
