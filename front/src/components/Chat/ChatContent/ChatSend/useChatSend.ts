import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { AdminNewMessageType, SocketType } from "types/types";
import { useChatStore } from "hooks/store/useChatStore";
import { ADMIN_ID } from "lib/constants/constants";

export const useChatSend = (socketState: SocketType) => {
  const [value, setValue] = useState<string>("");
  const { room } = useChatStore();

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 600) {
      setValue(e.target.value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleDisableNativeForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const onSubmit = () => {
    if (value.trim().length && socketState && room) {
      const messageInfo: AdminNewMessageType = {
        roomId: room.id,
        adminId: ADMIN_ID,
        servicesId: room.servicesId,
        userId: +room.userId,
        message: value,
      };

      socketState.emit("admin send message", messageInfo);
      setValue("");
    }
  };

  return {
    value,
    onSubmit,
    handleKeyDown,
    handleChangeValue,
    handleDisableNativeForm,
  };
};
