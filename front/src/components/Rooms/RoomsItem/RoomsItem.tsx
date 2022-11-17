import React from "react";
import { IRoomModel } from "lib/models/IRoomModel";
import { useRoomsItemStyles } from "components/Rooms/RoomsItem/styles";
import { useRoomItem } from "components/Rooms/RoomsItem/useRoomItem";

const RoomsItem = ({ id, title, message, date }: IRoomModel) => {
  const { isActive, handleClickRoom } = useRoomItem(id);
  return (
    <ButtonSC activeStyle={isActive} onClick={handleClickRoom}>
      <MainInfoTextSC>
        <HeaderTextSC>
          <TitleSC>{title}</TitleSC>
          <DateSC>{date}</DateSC>
        </HeaderTextSC>
        <MessageSC>{message}</MessageSC>
      </MainInfoTextSC>
    </ButtonSC>
  );
};

const { ButtonSC, MainInfoTextSC, HeaderTextSC, TitleSC, MessageSC, DateSC } =
  useRoomsItemStyles();

export default React.memo(RoomsItem);
