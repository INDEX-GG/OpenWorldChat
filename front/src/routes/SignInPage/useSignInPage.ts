import { FormEvent, useRef, useState } from "react";
import { useAuthStore } from "hooks/store/useAuthStore";
import { FetchRejectCallback, IError } from "types/types";

export const useSignInPage = () => {
  const { handleLoginUser } = useAuthStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState<IError>({
    isError: false,
    message: "",
  });

  const handleChangeValue = () => {
    if (formError) setFormError({ isError: false, message: "" });
  };

  const rejectCallback: FetchRejectCallback = () => {
    setFormError({ isError: true, message: "Некорректные данные для входа" });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInputRef = emailRef.current;
    const passwordInputRef = passwordRef.current;
    if (emailInputRef && passwordInputRef) {
      handleLoginUser({
        email: emailInputRef.value,
        password: passwordInputRef.value,
      });
    }
  };

  return {
    emailRef,
    passwordRef,
    formError,
    onSubmit,
    handleChangeValue,
  };
};
