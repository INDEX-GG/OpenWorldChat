import React from "react";
import { styled } from "@mui/material";
import ChatHeader from "components/Chat/ChatContent/ChatHeader/ChatHeader";
import ChatMessages from "components/Chat/ChatContent/ChatMessages/ChatMessages";
import ChatSend from "components/Chat/ChatContent/ChatSend/ChatSend";
import { IChatContent } from "components/Chat/ChatContent/types";

const ChatContent = ({ room, socketState }: IChatContent) => {
  const { user, messages, servicesName } = room;

  return (
    <ContainerSC>
      <ChatHeader user={user} servicesName={servicesName} />
      <ChatMessages messages={messages} />
      <ChatSend socketState={socketState} />
    </ContainerSC>
  );
};

const ContainerSC = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default React.memo(ChatContent);
