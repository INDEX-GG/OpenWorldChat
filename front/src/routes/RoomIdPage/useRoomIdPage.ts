import { useEffect } from "react";
import { ADMIN_ID } from "lib/constants/constants";
import { useChatStore } from "hooks/store/useChatStore";
import { useParams } from "react-router-dom";

export const useRoomIdPage = () => {
  // const [socketState, setSocketState] = useState<Socket | null>(null);
  const params = useParams();
  const { room, isLoading, handleGetCurrentChatInfo, handleResetChat } =
    useChatStore();

  useEffect(() => {
    if (params) {
      const { roomId } = params;
      console.log(roomId);
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
      console.log(123);

      // const socket = io(BASE_URL as string, {
      //   path: PATH_URL,
      //   query: {
      //     role: "admin",
      //     userId: ADMIN_ID,
      //     email: sessionStorage.getItem(SessionStorageEnum.EMAIL),
      //     password: sessionStorage.getItem(SessionStorageEnum.PASSWORD),
      //   },
      // });
      //
      // socket.on("connect", () => {
      //   setSocketState(socket);
      //   console.log(rooms);
      //   socket.emit("connect current rooms");
      // });
    }
  }, [isLoading, room]);

  return {
    // socketState,
  };
};
