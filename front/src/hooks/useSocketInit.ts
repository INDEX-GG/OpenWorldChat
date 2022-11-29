import { useRoomsStore } from "hooks/store/useRoomsStore";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "hooks/store/useStore";
import {
  changeMessageInRoom,
  roomsChangeSocketConnect,
  roomsDataSlice,
  roomsErrorSlice,
  roomsLoadingSlice,
} from "store/reducers/roomsSlice/roomsSlice";
import { BASE_URL, PATH_URL } from "lib/constants/constants";
import { SessionStorageEnum } from "types/types";
import { IRoomModel } from "lib/models/IRoomModel";
import { IMessageModel } from "lib/models/IMessageModel";

export const useSocketInit = () => {
  const {
    page,
    pageLimit,
    hasError,
    isLoading,
    isEnd,
    rooms,
    isSocketConnect,
  } = useRoomsStore();
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  const handleGetRooms = (socket = socketState) => {
    if (socket) {
      socket.emit("pagination rooms", { page, pageLimit });
    }
  };

  const handleSocketConnect = () => {
    if (socketState) {
      socketState.connect();
    }
  };

  const handleError = (socket = socketState) => {
    return (error: string) => {
      if (socket) {
        dispatch(roomsErrorSlice(error));
        dispatch(roomsChangeSocketConnect(false));
        socket.disconnect();
      }
    };
  };

  useEffect(() => {
    //! check socket connect
    if (isSocketConnect) return;

    const socket = io(BASE_URL as string, {
      path: PATH_URL,
      query: {
        role: "admin",
        userId: 999999,
        customRoomName: "SOCKET_ADMIN_ALL_ROOMS",
        email: sessionStorage.getItem(SessionStorageEnum.EMAIL),
        password: sessionStorage.getItem(SessionStorageEnum.PASSWORD),
      },
    });

    //! connect
    socket.on("connect", () => {
      //! connect room
      socket.emit("connect all rooms");
      dispatch(roomsLoadingSlice());
      dispatch(roomsChangeSocketConnect(true));
    });

    //! error connect
    socket.on("connect_error", () =>
      handleError(socket)(
        "Ошибка подключения пожалуйста попробуйте подключиться позже",
      ),
    );

    //! confirm auth
    socket.on("admin confirm", () => {
      handleGetRooms(socket);
      setSocketState(socket);
    });

    //! get all rooms
    socket.on("admin get all rooms", (rooms: IRoomModel[]) => {
      dispatch(roomsDataSlice(rooms));
    });

    //! new message
    socket.on("message save", (message: IMessageModel) => {
      dispatch(changeMessageInRoom(message));
    });

    //! error
    socket.on("error", handleError);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        socket.emit("admin leave all room");
      }
    });
  }, []);

  return {
    rooms,
    isEnd,
    isLoading,
    hasError,
    handleGetRooms,
    handleSocketConnect,
  };
};
