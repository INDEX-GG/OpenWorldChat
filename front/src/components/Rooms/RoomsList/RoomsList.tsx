import React from "react";
import { IRoomModel } from "lib/models/IRoomModel";
import RoomsItem from "components/Rooms/RoomsItem/RoomsItem";

interface IRoomsListProps {
  data: string[];
}

const RoomsList = ({ data }: IRoomsListProps) => {
  return (
    <>
      {data.map((roomItem) => {
        const parseRoomItem = JSON.parse(roomItem) as IRoomModel;
        return <RoomsItem key={parseRoomItem.id} {...parseRoomItem} />;
      })}
    </>
  );
};

export default React.memo(RoomsList);
