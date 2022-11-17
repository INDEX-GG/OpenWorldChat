import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: auto;
  }
  
  body {
    height: 100%;
    font-family: Montserrat, sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #161616;
    background-color: #A0D4EC;
  }
  
  #root {
    height: 100%;
  }
  
  *, *:after, *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  button {
    font-family: inherit !important;
  }
`;
