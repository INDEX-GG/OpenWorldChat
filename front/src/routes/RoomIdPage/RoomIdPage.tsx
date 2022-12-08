import React from "react";
import RoomsLayout from "layout/RoomsLayout/RoomsLayout";
import Chat from "components/Chat/Chat";
import { useRoomIdPage } from "routes/RoomIdPage/useRoomIdPage";

const RoomIdPage = () => {
  //! socket state props drilling (x4)
  //! Chat -> ChatContent -> ChatSend -> useChatSend
  const { socketState } = useRoomIdPage();

  return (
    <RoomsLayout isOverflowScroll={true}>
      <Chat socketState={socketState} />
    </RoomsLayout>
  );
};

export default React.memo(RoomIdPage);
