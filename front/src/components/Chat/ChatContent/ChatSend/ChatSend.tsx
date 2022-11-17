import React from "react";
import { useStylesChatSend } from "components/Chat/ChatContent/ChatSend/styles";
import SendIcon from "assets/icons/Send/SendIcon";
import { useChatSend } from "components/Chat/ChatContent/ChatSend/useChatSend";

const ChatSend = () => {
  const { value, handleChangeValue, onSubmit } = useChatSend();

  return (
    <FooterSC>
      <FormSC onSubmit={onSubmit}>
        <TextAreaContainerSC>
          <TextAreaSC
            multiline
            maxRows={5}
            fullWidth
            value={value}
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
