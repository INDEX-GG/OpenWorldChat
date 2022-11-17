import React from "react";
import { useChatHeaderStyles } from "components/Chat/ChatContent/ChatHeader/styles";

const ChatHeader = () => {
  return (
    <HeaderSC>
      <NameSC>Филипова Анастасия Викторовна</NameSC>
      <EmailSC>anastasia23@mail.ru</EmailSC>
    </HeaderSC>
  );
};

const { HeaderSC, NameSC, EmailSC } = useChatHeaderStyles();

export default React.memo(ChatHeader);
