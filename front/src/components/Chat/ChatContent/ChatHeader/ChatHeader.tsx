import React, { useMemo } from "react";
import { useChatHeaderStyles } from "components/Chat/ChatContent/ChatHeader/styles";
import { IRoomModel } from "lib/models/IRoomModel";

type ChatHeader = Pick<IRoomModel, "user" | "servicesName">;

const ChatHeader = ({ user, servicesName }: ChatHeader) => {
  const { name, email, lastname, patronymic } = user;

  const userFIO = useMemo(() => {
    if (name || email || patronymic) {
      return `${name || ""} ${lastname || ""} ${patronymic || ""}`.trim();
    }
    return false;
  }, [name, lastname, patronymic, email]);

  return (
    <HeaderSC>
      <UserContainerSC>
        {userFIO && <NameSC>{userFIO}</NameSC>}
        <EmailSC isMain={!userFIO}>{email}</EmailSC>
      </UserContainerSC>
      <ServiceNameSC>{servicesName.replace(/->/gi, "/")}</ServiceNameSC>
    </HeaderSC>
  );
};

const { HeaderSC, NameSC, EmailSC, ServiceNameSC, UserContainerSC } =
  useChatHeaderStyles();

export default React.memo(ChatHeader);
