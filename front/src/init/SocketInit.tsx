import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL, PATH_URL } from "lib/constants/constants";
import { SessionStorageEnum } from "types/types";
import { useAppDispatch } from "hooks/store/useStore";
import {
  changeMessageInRoom,
  roomsDataSlice,
  roomsErrorSlice,
  roomsLoadingSlice,
} from "store/reducers/roomsSlice/roomsSlice";
import { IRoomModel } from "lib/models/IRoomModel";
import { useRoomsStore } from "hooks/store/useRoomsStore";
import { IMessageModel } from "lib/models/IMessageModel";

const SocketInit = () => {
  const { page, pageLimit } = useRoomsStore();
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  const handleGetRooms = (socket: Socket) => {
    socket.emit("pagination rooms", { page, pageLimit });
  };

  const handleError = (socket = socketState) => {
    return (error: string) => {
      if (socket) {
        dispatch(roomsErrorSlice(error));
        socket.disconnect();
      }
    };
  };

  useEffect(() => {
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

    setSocketState(socketState);

    //! connect
    socket.on("connect", () => {
      //! connect room
      socket.emit("connect all rooms");
      dispatch(roomsLoadingSlice());
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
    });

    //! get all rooms
    socket.on("admin get all rooms", (socket: IRoomModel[]) => {
      dispatch(roomsDataSlice(socket));
    });

    //! new message
    socket.on("message save", (message: IMessageModel) => {
      dispatch(changeMessageInRoom(message));
    });

    //! error
    socket.on("error", handleError);
  }, []);

  return null;
};

export default React.memo(SocketInit);
