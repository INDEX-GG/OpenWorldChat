import React from "react";
import { IMessageModel } from "lib/models/IMessageModel";
import { useChatMessageItem } from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/useChatMessageItem";
import { useChatMessageItemStyles } from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/styles";

const ChatMessageItem = (props: IMessageModel) => {
  const { text, date } = props;
  const { isMyMessage } = useChatMessageItem(props);

  return (
    <MessageContainerSC isMyMessage={isMyMessage}>
      <MessageSC isMyMessage={isMyMessage}>{text}</MessageSC>
      <DateSC isMyMessage={isMyMessage}>{date}</DateSC>
    </MessageContainerSC>
  );
};

const { MessageSC, MessageContainerSC, DateSC } = useChatMessageItemStyles();

export default React.memo(ChatMessageItem);
