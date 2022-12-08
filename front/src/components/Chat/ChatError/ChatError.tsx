import React from "react";
import ButtonUI from "UI/ButtonUI/ButtonUI";
import { styled } from "@mui/material";
import { FetchChatIdRequest } from "store/reducers/chatSlice/asyncThunk/chatThunk";
import { useParams } from "react-router-dom";

interface IChatErrorProps {
  error: string;
  handleReload: (data: FetchChatIdRequest) => void;
}

const ChatError = ({ error, handleReload }: IChatErrorProps) => {
  const { roomId } = useParams();
  const onClick = () => {
    if (roomId) {
      handleReload({ roomId: +roomId });
    }
  };
  return (
    <ContainerSC>
      <ErrorMessageSC>{error}</ErrorMessageSC>
      {roomId && <ButtonUI onClick={onClick}>Повторная загрузка</ButtonUI>}
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

const ErrorMessageSC = styled("p")`
  font-size: 24px;
  text-transform: uppercase;
  color: #ff6565;
  max-width: 100%;
  word-wrap: break-word;
  margin-bottom: 10px;
`;

export default React.memo(ChatError);
