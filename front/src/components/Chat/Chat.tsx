import React, { useMemo } from "react";
import { useChatStore } from "hooks/store/useChatStore";
import ChatLoading from "components/Chat/ChatLoading/ChatLoading";
import ChatError from "components/Chat/ChatError/ChatError";
import ChatContent from "components/Chat/ChatContent/ChatContent";
import { IRoomModel } from "lib/models/IRoomModel";
import { ISocketProps } from "types/types";

const Chat = ({ socketState }: ISocketProps) => {
  const { room, isLoading, hasError, handleGetCurrentChatInfo } =
    useChatStore();

  const loadingComponent = useMemo(
    () => isLoading && !hasError,
    [isLoading, hasError],
  );

  const errorComponent = useMemo(
    () => hasError && !isLoading,
    [hasError, isLoading],
  );

  const chatComponent = useMemo(
    () => !isLoading && !hasError && room,
    [isLoading, hasError, room],
  );

  return (
    <>
      {loadingComponent && <ChatLoading />}
      {errorComponent && (
        <ChatError error={hasError} handleReload={handleGetCurrentChatInfo} />
      )}
      {chatComponent && (
        <ChatContent room={room as IRoomModel} socketState={socketState} />
      )}
    </>
  );
};

export default React.memo(Chat);
