import { ChangeEvent, FormEvent, useState } from "react";

export const useChatSend = () => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setValue(e.target.value);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return {
    value,
    onSubmit,
    handleChangeValue,
  };
};
