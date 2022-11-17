import { IMessageModel } from "lib/models/IMessageModel";
import { useMemo } from "react";
import { ADMIN_ID } from "lib/constants/constants";

export const useChatMessageItem = ({ id }: IMessageModel) => {
  const isMyMessage = useMemo(() => id === ADMIN_ID, [id]);
  return {
    isMyMessage,
  };
};
