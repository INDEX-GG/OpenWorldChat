import React from "react";
import ButtonUI from "UI/ButtonUI/ButtonUI";
import { styled } from "@mui/material";

interface IChatErrorProps {
  error: string;
}

const ChatError = ({ error }: IChatErrorProps) => {
  return (
    <ContainerSC>
      <ErrorMessageSC>{error}</ErrorMessageSC>
      <ButtonUI>Повторная загрузка</ButtonUI>
    </ContainerSC>
  );
};

const ContainerSC = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorMessageSC = styled("h1")`
  font-size: 24px;
  text-transform: uppercase;
  color: #ff6565;
`;

export default React.memo(ChatError);
