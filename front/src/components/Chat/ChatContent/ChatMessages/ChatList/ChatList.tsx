import React from "react";
import { IMessageModel } from "lib/models/IMessageModel";
import ChatMessageDate from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/ChatMessageDate";
import ChatMessageItem from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/ChatMessageItem";

interface IChatListProps {
  messages: IMessageModel[];
}

const ChatList = ({ messages }: IChatListProps) => {
  return (
    <>
      {messages.map((messageItem, index) => (
        <>
          <ChatMessageDate
            key={messageItem.id}
            currentMessage={messageItem}
            prevMessage={messages[index - 1]}
          />
          <ChatMessageItem key={messageItem.id} {...messageItem} />
        </>
      ))}
    </>
  );
};

export default React.memo(ChatList);
