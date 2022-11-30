import { useEffect } from "react";
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

  useEffect(() => {
    if (params) {
      const { roomId } = params;
      if (roomId && ADMIN_ID) {
        handleGetCurrentChatInfo({ roomId: +roomId });
      }
    }
    return () => {
      handleResetChat();
    };
  }, [params]);

  useEffect(() => {
    if (!isLoading && room && room.id) {
      dispatch(roomsAddChatInRooms([room]));
      dispatch(roomsChangeStatusRoom(room.id));
    }
  }, [isLoading, room]);

  return {
    // socketState,
  };
};
