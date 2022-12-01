import { styled } from "@mui/material";

const MessageContainerSC = styled("div")<{ isMyMessage: boolean }>`
  margin-bottom: 30px;
  display: flex;
  flex-direction: ${({ isMyMessage }) => (isMyMessage ? "row-reverse" : "row")};
  align-items: flex-end;
  align-self: ${({ isMyMessage }) => (isMyMessage ? "flex-end" : "flex-start")};
`;

const MessageSC = styled("pre")<{ isMyMessage: boolean }>`
  max-width: 75%;
  word-break: break-word;
  padding: 15px 23px;
  font-family: inherit;
  white-space: pre-wrap;
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? "#A0D4EC" : "#EEF4F7"};
  border-radius: ${({ isMyMessage }) =>
    isMyMessage ? "15px 15px 0 15px" : "15px 15px 15px 0px"};
`;

const DateSC = styled("time")<{ isMyMessage: boolean }>`
  margin: ${({ isMyMessage }) => (isMyMessage ? "0 15px 0 0" : "0 0 0 15px")};
  font-size: 16px;
  line-height: 20px;
  color: #c7c7c7;
`;

export const useChatMessageItemStyles = () => ({
  DateSC,
  MessageSC,
  MessageContainerSC,
});
