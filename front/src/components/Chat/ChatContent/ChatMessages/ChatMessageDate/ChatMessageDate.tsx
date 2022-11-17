import React from "react";
import { useChatMessageDateStyles } from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/styles";

const ChatMessageDate = () => {
  const isVisible = true;
  return isVisible ? <DateContainerSC>2 ноября 2022</DateContainerSC> : null;
};

const { DateContainerSC } = useChatMessageDateStyles();

export default React.memo(ChatMessageDate);
