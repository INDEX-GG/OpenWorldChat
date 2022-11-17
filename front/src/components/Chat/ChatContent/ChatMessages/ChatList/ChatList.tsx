import React from "react";
import { IMessageModel } from "lib/models/IMessageModel";
import ChatMessageDate from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/ChatMessageDate";
import ChatMessageItem from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/ChatMessageItem";

interface IChatListProps {
  messagesData: IMessageModel[];
}

const ChatList = ({ messagesData }: IChatListProps) => {
  return (
    <>
      {messagesData.map((messageItem) => (
        <>
          <ChatMessageDate key={messageItem.id} />
          <ChatMessageItem key={messageItem.id} {...messageItem} />
        </>
      ))}
    </>
  );
};

export default React.memo(ChatList);
