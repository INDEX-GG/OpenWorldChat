import { Button, styled } from "@mui/material";

const ButtonSC = styled(Button)<{ activeStyle: boolean }>`
  width: 100%;
  padding: 7px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${({ activeStyle }) =>
    activeStyle ? "#A0D4EC" : "#eef4f7"};
  text-align: left;
  text-transform: none;
  transition: 0.2s all linear;
  border-radius: 0;
  &:hover {
    background-color: ${({ activeStyle }) =>
      activeStyle ? "#A0D4EC" : "#ccdde2"};
  }
`;

const MainInfoTextSC = styled("div")`
  width: 100%;
`;

const HeaderTextSC = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const TitleSC = styled("h4")`
  color: #161616;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 7px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MessageSC = styled("p")`
  font-size: 16px;
  line-height: 20px;
  color: #585858;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DateSC = styled("time")`
  margin-left: 10px;
  font-size: 16px;
  line-height: 20px;
  color: #585858;
`;

export const useRoomsItemStyles = () => ({
  ButtonSC,
  HeaderTextSC,
  MainInfoTextSC,
  TitleSC,
  MessageSC,
  DateSC,
});
