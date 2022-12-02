import { styled } from "@mui/material";

const HeaderSC = styled("header")`
  padding: 27px 36px 20px;
  border-bottom: 2px solid #ccdde2;
`;

const ServiceNameSC = styled("h3")`
  font-size: 14px;
  line-height: 18px;
`;

const UserContainerSC = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NameSC = styled("h1")`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0 18px 0 0;
`;
const EmailSC = styled("h2")<{ isMain: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${({ isMain }) => (isMain ? "#161616" : "#c7c7c7")};
`;

export const useChatHeaderStyles = () => ({
  HeaderSC,
  NameSC,
  EmailSC,
  ServiceNameSC,
  UserContainerSC,
});
