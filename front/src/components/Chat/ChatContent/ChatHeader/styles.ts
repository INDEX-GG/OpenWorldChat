import { styled } from "@mui/material";

const HeaderSC = styled("header")`
  padding: 27px 36px 23px;
  border-bottom: 2px solid #ccdde2;
  display: flex;
  align-items: center;
  margin: 0;
`;
const NameSC = styled("h1")`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0 18px 0 0;
`;
const EmailSC = styled("h2")`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #c7c7c7;
`;

export const useChatHeaderStyles = () => ({
  HeaderSC,
  NameSC,
  EmailSC,
});
