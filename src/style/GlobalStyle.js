import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Roboto';
    }
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:focus { text-decoration: none; }
    a:active { text-decoration: none; }
    a {
        text-decoration: underline;
        color: white;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Roboto';
    }
    input {
        height: 52px;
        border-radius: 8px;
        padding-left: 14px;
        border: none;
    }
    button {
        border-radius: 8px;
        border: none;
        height: 52px;
        background-color: #ff4791;
        color: white;
        font-size: 14px;
        font-weight: 700;
    }
`;

export default GlobalStyle;
