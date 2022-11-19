import React from "react";
import { useChatStore } from "hooks/store/useChatStore";
import ChatContent from "components/Chat/ChatContent/ChatContent";
import ChatLoading from "components/Chat/ChatLoading/ChatLoading";
import ChatError from "components/Chat/ChatError/ChatError";

const Chat = () => {
  const { isLoading, hasError } = useChatStore();

  return (
    <>
      {isLoading && <ChatLoading />}
      {hasError && <ChatError error={hasError} />}
      {!isLoading && !hasError && <ChatContent />}
    </>
  );
};

export default React.memo(Chat);
