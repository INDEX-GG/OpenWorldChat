import { createGlobalStyle } from "styled-components";

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    font-variant: normal;
    src: url("../assets/fonts/Montserrat-SemiBold.woff2") format("woff2"),
    url("../assets/fonts/Montserrat-SemiBold.woff") format("woff");
  }

  @font-face {
   font-family: 'Montserrat';
   font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    font-variant: normal;
   src: url("../assets/fonts/Montserrat-Medium.woff2") format("woff2"),
   url("../assets/fonts/Montserrat-Medium.woff") format("woff");
 }
`;
