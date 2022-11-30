import { styled } from "@mui/material";

const MainSC = styled("main")`
  width: 100%;
  flex-grow: 1;
  padding: 20px 35px 5px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ScrollingLoadingSC = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const useChatMessagesStyles = () => ({
  MainSC,
  ScrollingLoadingSC,
});
