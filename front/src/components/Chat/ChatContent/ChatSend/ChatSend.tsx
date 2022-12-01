import React from "react";
import { useStylesChatSend } from "components/Chat/ChatContent/ChatSend/styles";
import SendIcon from "assets/icons/Send/SendIcon";
import { useChatSend } from "components/Chat/ChatContent/ChatSend/useChatSend";
import { ISocketProps } from "types/types";

const ChatSend = ({ socketState }: ISocketProps) => {
  const { value, handleChangeValue, handleKeyDown, handleDisableNativeForm } =
    useChatSend(socketState);

  return (
    <FooterSC>
      <FormSC onSubmit={handleDisableNativeForm}>
        <TextAreaContainerSC>
          <TextAreaSC
            multiline
            maxRows={5}
            fullWidth
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChangeValue}
            error={value.length > 500}
            placeholder={"Написать сообщение..."}
          />
        </TextAreaContainerSC>
        <ButtonSendSC type="submit" variant="outlined">
          <SendIcon />
        </ButtonSendSC>
      </FormSC>
      <TextAreaLengthSC>{value.length} / 500</TextAreaLengthSC>
    </FooterSC>
  );
};

const {
  FormSC,
  FooterSC,
  ButtonSendSC,
  TextAreaSC,
  TextAreaLengthSC,
  TextAreaContainerSC,
} = useStylesChatSend();

export default React.memo(ChatSend);
