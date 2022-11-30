import { useEffect } from "react";
import { ADMIN_ID } from "lib/constants/constants";
import { useChatStore } from "hooks/store/useChatStore";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "hooks/store/useStore";
import {
  roomsAddChatInRooms,
  roomsChangeStatusRoom,
  roomsDataSlice,
  roomsLoadingSlice,
} from "store/reducers/roomsSlice/roomsSlice";

export const useRoomIdPage = () => {
  // const [socketState, setSocketState] = useState<Socket | null>(null);
  const params = useParams();
  const { room, isLoading, handleGetCurrentChatInfo, handleResetChat } =
    useChatStore();
  const dispatch = useAppDispatch();

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
      const responseChatInRoom = dispatch(roomsAddChatInRooms([room]));
      if (responseChatInRoom.payload) dispatch(roomsChangeStatusRoom(room.id));
    }
  }, [isLoading, room]);

  return {
    // socketState,
  };
};
