import React from "react";
import { useChatMessages } from "components/Chat/ChatContent/ChatMessages/useChatMessages";
import ChatList from "components/Chat/ChatContent/ChatMessages/ChatList/ChatList";
import { useChatMessagesStyles } from "components/Chat/ChatContent/ChatMessages/styles";
import { IRoomModel } from "lib/models/IRoomModel";

const ChatMessages = ({ messages }: Pick<IRoomModel, "messages">) => {
  const { containerRef } = useChatMessages(messages);
  return (
    <MainSC ref={containerRef}>
      <ChatList messages={messages} />
    </MainSC>
  );
};

const { MainSC } = useChatMessagesStyles();
export default React.memo(ChatMessages);
