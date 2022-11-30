import React from "react";
import { styled } from "@mui/material";
import ChatHeader from "components/Chat/ChatContent/ChatHeader/ChatHeader";
import ChatMessages from "components/Chat/ChatContent/ChatMessages/ChatMessages";
import ChatSend from "components/Chat/ChatContent/ChatSend/ChatSend";
import { IChatContent } from "components/Chat/ChatContent/types";

const ChatContent = ({ room }: IChatContent) => {
  const { user, messages } = room;

  return (
    <ContainerSC>
      <ChatHeader
        name={user.name}
        lastname={user.lastname}
        patronymic={user.patronymic}
        email={user.email}
      />
      <ChatMessages messages={messages} />
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
