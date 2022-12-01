import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { SocketType } from "types/types";

export const useChatSend = (socketState: SocketType) => {
  const [value, setValue] = useState<string>("");

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
    if (value.trim().length) {
      console.log(value);
      console.log(socketState);
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
