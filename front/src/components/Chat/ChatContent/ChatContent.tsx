import React from "react";
import { styled } from "@mui/material";
import ChatHeader from "components/Chat/ChatContent/ChatHeader/ChatHeader";
import ChatMessages from "components/Chat/ChatContent/ChatMessages/ChatMessages";
import ChatSend from "components/Chat/ChatContent/ChatSend/ChatSend";

const ChatContent = () => {
  return (
    <ContainerSC>
      <ChatHeader />
      <ChatMessages />
      <ChatSend />
    </ContainerSC>
  );
};

const ContainerSC = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default React.memo(ChatContent);
