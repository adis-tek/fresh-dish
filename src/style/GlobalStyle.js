import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0px;
        color: black;
        font-family: 'Noto Sans', sans-serif;
        overflow-x: hidden;
        outline: none;
    }

    label {
        font-size: 18px;
    }

`;

export default GlobalStyle;