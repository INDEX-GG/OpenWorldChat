import React from "react";
import RoomsLayout from "layout/RoomsLayout/RoomsLayout";
import Chat from "components/Chat/Chat";
import { useRoomIdPage } from "routes/RoomIdPage/useRoomIdPage";

const RoomIdPage = () => {
  useRoomIdPage();
  return <RoomsLayout isOverflowScroll={true}>{/*<Chat />*/}</RoomsLayout>;
};

export default React.memo(RoomIdPage);
