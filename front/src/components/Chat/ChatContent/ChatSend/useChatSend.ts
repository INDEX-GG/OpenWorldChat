import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

export const useChatSend = () => {
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
