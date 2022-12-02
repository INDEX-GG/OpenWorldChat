import React from "react";
import { useChatMessageDateStyles } from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/styles";
import { IChatMessageDateProps } from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/types";
import { useChatMessageDate } from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/useChatMessageDate";

const ChatMessageDate = (props: IChatMessageDateProps) => {
  const { isVisibleDate, dateText } = useChatMessageDate(props);
  return isVisibleDate ? <DateContainerSC>{dateText}</DateContainerSC> : null;
};

const { DateContainerSC } = useChatMessageDateStyles();

export default React.memo(ChatMessageDate);
