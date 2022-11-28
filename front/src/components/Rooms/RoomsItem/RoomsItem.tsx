import React from "react";
import { IRoomModel } from "lib/models/IRoomModel";
import { useRoomsItemStyles } from "components/Rooms/RoomsItem/styles";
import { useRoomItem } from "components/Rooms/RoomsItem/useRoomItem";

const RoomsItem = (props: IRoomModel) => {
  const { isActive, handleClickRoom, userName, messageText, messageDate } =
    useRoomItem(props);

  return (
    <ButtonSC activeStyle={isActive} onClick={handleClickRoom}>
      <MainInfoTextSC>
        <HeaderTextSC>
          <TitleSC>{userName}</TitleSC>
          <DateSC>{messageDate}</DateSC>
        </HeaderTextSC>
        <MessageSC>{messageText}</MessageSC>
      </MainInfoTextSC>
    </ButtonSC>
  );
};

const { ButtonSC, MainInfoTextSC, HeaderTextSC, TitleSC, MessageSC, DateSC } =
  useRoomsItemStyles();

export default React.memo(RoomsItem);
