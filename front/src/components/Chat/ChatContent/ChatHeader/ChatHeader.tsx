import React, { useMemo } from "react";
import { useChatHeaderStyles } from "components/Chat/ChatContent/ChatHeader/styles";
import { IRoomModel } from "lib/models/IRoomModel";

type UserType = Pick<IRoomModel, "user">["user"];
type ChatHeader = Pick<UserType, "name" | "lastname" | "patronymic" | "email">;

const ChatHeader = ({ name, email, lastname, patronymic }: ChatHeader) => {
  const userFIO = useMemo(() => {
    if (name || email || patronymic) {
      return `${name || ""} ${lastname || ""} ${patronymic || ""}`.trim();
    }
    return false;
  }, [name, lastname, patronymic, email]);
  return (
    <HeaderSC>
      {userFIO && <NameSC>{userFIO}</NameSC>}
      <EmailSC isMain={!userFIO}>{email}</EmailSC>
    </HeaderSC>
  );
};

const { HeaderSC, NameSC, EmailSC } = useChatHeaderStyles();

export default React.memo(ChatHeader);
