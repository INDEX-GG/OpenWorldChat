import { IMessageModel } from "lib/models/IMessageModel";
import { useMemo } from "react";
import { ADMIN_ID } from "lib/constants/constants";

export const useChatMessageItem = ({ senderId }: IMessageModel) => {
  const isMyMessage = useMemo(() => senderId === ADMIN_ID, [senderId]);
  return {
    isMyMessage,
  };
};
