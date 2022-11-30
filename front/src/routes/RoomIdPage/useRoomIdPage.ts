import { useEffect, useState } from "react";
import { ADMIN_ID } from "lib/constants/constants";
import { useChatStore } from "hooks/store/useChatStore";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "hooks/store/useStore";
import {
  roomsAddChatInRooms,
  roomsChangeStatusRoom,
} from "store/reducers/roomsSlice/roomsSlice";

export const useRoomIdPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { room, isLoading, handleGetCurrentChatInfo, handleResetChat } =
    useChatStore();
  const [isConnectSocket, setIsConnectSocket] = useState<boolean>(false);

  //! Main Logic - 1
  //? get room data in db and verify admin
  useEffect(() => {
    if (params) {
      const { roomId } = params;
      if (roomId && ADMIN_ID) {
        handleGetCurrentChatInfo({ roomId: +roomId });
      }
    }
  }, [params]);

  //! Main Logic - 2
  //? change store and ready connect to socket
  useEffect(() => {
    if (isLoading && room && room.id) {
      dispatch(roomsAddChatInRooms([room]));
      dispatch(roomsChangeStatusRoom(room.id));
      setIsConnectSocket(true);
    }
  }, [isLoading, room]);

  //! Main Logic - 3
  //? connect socket
  useEffect(() => {
    if (isConnectSocket) {
      console.log(isConnectSocket);
    }

    return () => {
      handleResetChat();
    };
  }, [isConnectSocket]);

  return {
    // socketState,
  };
};
