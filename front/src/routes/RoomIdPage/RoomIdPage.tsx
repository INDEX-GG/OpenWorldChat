import React from "react";
import RoomsLayout from "layout/RoomsLayout/RoomsLayout";
import Chat from "components/Chat/Chat";

const RoomIdPage = () => {
  return (
    <RoomsLayout isOverflowScroll={true}>
      <Chat />
    </RoomsLayout>
  );
};

export default React.memo(RoomIdPage);
