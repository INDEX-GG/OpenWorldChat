import React from "react";
import { IRoomModel } from "lib/models/IRoomModel";
import RoomsItem from "components/Rooms/RoomsItem/RoomsItem";

interface IRoomsListProps {
  data: IRoomModel[];
}

const RoomsList = ({ data }: IRoomsListProps) => {
  return (
    <>
      {data.map((roomItem) => (
        <RoomsItem key={roomItem.id} {...roomItem} />
      ))}
    </>
  );
};

export default React.memo(RoomsList);
