import React from "react";
import { useChatMessages } from "components/Chat/ChatContent/ChatMessages/useChatMessages";
import ChatList from "components/Chat/ChatContent/ChatMessages/ChatList/ChatList";
import { useChatMessagesStyles } from "components/Chat/ChatContent/ChatMessages/styles";
import { IRoomModel } from "lib/models/IRoomModel";
import SpinnerUI from "UI/SpinnerUI/SpinnerUI";

const ChatMessages = ({ messages }: Pick<IRoomModel, "messages">) => {
  const { containerRef, isContainerScroll } = useChatMessages(messages);
  return (
    <>
      <MainSC ref={containerRef}>
        <ChatList messages={messages} />
      </MainSC>
      {!isContainerScroll && (
        <ScrollingLoadingSC>
          <SpinnerUI size={70} />
        </ScrollingLoadingSC>
      )}
    </>
  );
};

const { MainSC, ScrollingLoadingSC } = useChatMessagesStyles();
export default React.memo(ChatMessages);
