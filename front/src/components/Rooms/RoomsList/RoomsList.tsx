import React from "react";
import { IChatRoom } from "lib/models/IRoomModel";
import RoomsItem from "components/Rooms/RoomsItem/RoomsItem";

interface IRoomsListProps {
  data: string[];
}

const RoomsList = ({ data }: IRoomsListProps) => {
  return (
    <>
      {data.map((roomItem) => {
        const parseRoomItem = JSON.parse(roomItem) as IChatRoom;
        return <RoomsItem key={parseRoomItem.room.id} {...parseRoomItem} />;
      })}
    </>
  );
};

export default React.memo(RoomsList);
