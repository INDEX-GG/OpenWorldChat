import React from "react";
import { IMessageModel } from "lib/models/IMessageModel";
import { useChatMessageItem } from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/useChatMessageItem";
import { useChatMessageItemStyles } from "components/Chat/ChatContent/ChatMessages/ChatMessageItem/styles";
import { getRusDateMessage } from "lib/services/services";

const ChatMessageItem = (props: IMessageModel) => {
  const { text, createdAt } = props;
  const { isMyMessage } = useChatMessageItem(props);

  return (
    <MessageContainerSC isMyMessage={isMyMessage}>
      <MessageSC isMyMessage={isMyMessage}>{text}</MessageSC>
      <DateSC isMyMessage={isMyMessage}>{getRusDateMessage(createdAt)}</DateSC>
    </MessageContainerSC>
  );
};

const { MessageSC, MessageContainerSC, DateSC } = useChatMessageItemStyles();

export default React.memo(ChatMessageItem);
