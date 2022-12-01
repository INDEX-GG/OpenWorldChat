import { useEffect, useState } from "react";
import { ADMIN_ID, BASE_URL, PATH_URL } from "lib/constants/constants";
import { useChatStore } from "hooks/store/useChatStore";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "hooks/store/useStore";
import {
  roomsAddChatInRooms,
  roomsChangeStatusRoom,
} from "store/reducers/roomsSlice/roomsSlice";
import { io } from "socket.io-client";
import { getSessionItem } from "lib/services/services";
import { SessionStorageEnum, SocketType } from "types/types";
import { IMessageModel } from "lib/models/IMessageModel";

export const useRoomIdPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [socketState, setSocketState] = useState<SocketType>(null);
  const [isConnectSocket, setIsConnectSocket] = useState<boolean>(false);

  const {
    room,
    isLoading,
    hasError,
    handleResetChat,
    handleAddNewMessage,
    handleChangeStatusChat,
    handleGetCurrentChatInfo,
  } = useChatStore();

  const handleError = (socket = socketState, message: string) => {
    if (socket) {
      socket.disconnect();
      setIsConnectSocket(false);
      handleResetChat();
      handleChangeStatusChat({ isLoading: false, hasError: message });
    }
  };

  //! Main Logic - 1
  //? get room data in db and verify admin
  useEffect(() => {
    if (params) {
      const { roomId } = params;
      if (roomId && ADMIN_ID) {
        handleGetCurrentChatInfo({ roomId: +roomId });
      }
    }
    return () => {
      setSocketState(null);
      setIsConnectSocket(false);
      handleResetChat();
    };
  }, [params]);

  //! Main Logic - 2
  //? change store and ready connect to socket
  useEffect(() => {
    if (isLoading && !hasError && room && room.id) {
      dispatch(roomsAddChatInRooms([room]));
      dispatch(roomsChangeStatusRoom(room.id));
      setIsConnectSocket(true);
    }
  }, [isLoading, hasError, room]);

  //! Main Logic - 3
  //? connect socket
  useEffect(() => {
    if (isConnectSocket && room) {
      const socket = io(BASE_URL as string, {
        path: PATH_URL,
        query: {
          role: "admin",
          userId: ADMIN_ID,
          customRoomName: `room:admin/${room.id}`,
          email: getSessionItem(SessionStorageEnum.EMAIL),
          password: getSessionItem(SessionStorageEnum.PASSWORD),
        },
      });

      //! connect
      socket.on("connect", () => {
        socket.emit("admin connect current rooms");
      });

      //! error connect
      socket.on("connect_error", () => {
        handleError(
          socket,
          "Ошибка подключения пожалуйста попробуйте подключиться позже",
        );
      });

      //! admin verify
      socket.on("admin confirm", () => {
        setSocketState(socket);
        handleChangeStatusChat({ isLoading: false, hasError: "" });
      });

      //! error
      socket.on("error", handleError);

      //! new message from user
      socket.on("message save", (message: IMessageModel) => {
        handleAddNewMessage(message);
      });

      //! success save new message admin
      socket.on("admin message save", (message: IMessageModel) => {
        handleAddNewMessage(message);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [isConnectSocket]);

  return {
    socketState,
  };
};
