import React, { useMemo } from "react";
import { IChatRoom } from "lib/models/IRoomModel";
import { useRoomsItemStyles } from "components/Rooms/RoomsItem/styles";
import { useRoomItem } from "components/Rooms/RoomsItem/useRoomItem";

const RoomsItem = (props: IChatRoom) => {
  const { isActive, handleClickRoom, userName, messageText, messageDate } =
    useRoomItem(props.room);
  const isNewMessage = useMemo(() => props?.status === 2, [props]);

  return (
    <ButtonSC activeStyle={isActive} onClick={handleClickRoom}>
      <MainInfoTextSC>
        <HeaderTextSC>
          <TitleContainerSC>
            <TitleSC>{userName}</TitleSC>
            {isNewMessage && <NewMessageSC />}
          </TitleContainerSC>
          <DateSC>{messageDate}</DateSC>
        </HeaderTextSC>
        <MessageSC>{messageText}</MessageSC>
      </MainInfoTextSC>
    </ButtonSC>
  );
};

const {
  ButtonSC,
  MainInfoTextSC,
  HeaderTextSC,
  TitleSC,
  MessageSC,
  DateSC,
  TitleContainerSC,
  NewMessageSC,
} = useRoomsItemStyles();

export default React.memo(RoomsItem);
