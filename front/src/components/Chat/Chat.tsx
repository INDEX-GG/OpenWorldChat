import React from "react";
import { useChatStore } from "hooks/store/useChatStore";
import ChatContent from "components/Chat/ChatContent/ChatContent";
import ChatLoading from "components/Chat/ChatLoading/ChatLoading";
import ChatError from "components/Chat/ChatError/ChatError";

const Chat = () => {
  const { room } = useChatStore();

  return (
    <>
      {room?.isLoading && <ChatLoading />}
      {room?.hasError && (
        <ChatError error={room?.hasError || "Ошибка подключения к комнате"} />
      )}
      {!room?.isLoading && !room?.hasError && <ChatContent />}
    </>
  );
};

export default React.memo(Chat);
