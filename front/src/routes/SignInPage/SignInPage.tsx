import React from "react";
import FormContainer from "components/FormContainer/FormContainer";
import InputUI from "UI/InputUI/InputUI";
import ButtonUI from "UI/ButtonUI/ButtonUI";
import { useSignInPage } from "routes/SignInPage/useSignInPage";
import { useSignInPageStyles } from "routes/SignInPage/styles";

const SignInPage = () => {
  const { emailRef, passwordRef, formError, onSubmit, handleChangeValue } =
    useSignInPage();

  return (
    <ContainerSC>
      <FormContainer title="Вход">
        <FormWrapperSC onSubmit={onSubmit}>
          <InputContainerSC>
            <InputUI
              inputRef={emailRef}
              name="email"
              type="email"
              label="Логин"
              inputMode="email"
              required={true}
              onChange={handleChangeValue}
            />
          </InputContainerSC>
          <InputContainerSC>
            <InputUI
              inputRef={passwordRef}
              name="password"
              type="password"
              label="Пароль"
              required={true}
              onChange={handleChangeValue}
            />
          </InputContainerSC>
          <ErrorParagraph>{formError.message}</ErrorParagraph>
          <ButtonContainerSC>
            <ButtonUI type="submit">Вход</ButtonUI>
          </ButtonContainerSC>
        </FormWrapperSC>
      </FormContainer>
    </ContainerSC>
  );
};

const {
  FormWrapperSC,
  ContainerSC,
  InputContainerSC,
  ErrorParagraph,
  ButtonContainerSC,
} = useSignInPageStyles();

export default React.memo(SignInPage);
