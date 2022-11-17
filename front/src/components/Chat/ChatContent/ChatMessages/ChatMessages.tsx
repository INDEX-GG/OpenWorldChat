import React from "react";
import { useChatMessages } from "components/Chat/ChatContent/ChatMessages/useChatMessages";
import ChatList from "components/Chat/ChatContent/ChatMessages/ChatList/ChatList";
import { messagesMock } from "lib/mock/messagesMock";
import { useChatMessagesStyles } from "components/Chat/ChatContent/ChatMessages/styles";

const ChatMessages = () => {
  const { containerRef } = useChatMessages();
  return (
    <MainSC ref={containerRef}>
      <ChatList messagesData={messagesMock} />
    </MainSC>
  );
};

const { MainSC } = useChatMessagesStyles();
export default React.memo(ChatMessages);
