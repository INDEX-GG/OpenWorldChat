import { useRoomsStore } from "hooks/store/useRoomsStore";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "hooks/store/useStore";
import {
  changeMessageInRoom,
  roomChangeLoading,
  roomsChangePage,
  roomsDataSlice,
  roomsErrorSlice,
  roomsLoadingSlice,
} from "store/reducers/roomsSlice/roomsSlice";
import {
  ADMIN_ALL_ROOM_NAME,
  ADMIN_ID,
  BASE_URL,
  SOCKET_PATH_URL,
} from "lib/constants/constants";
import { SessionStorageEnum, SocketType } from "types/types";
import { IRoomModel } from "lib/models/IRoomModel";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getSessionItem } from "lib/services/services";

export const useSocketInit = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuthStore();
  const { page, hasError, isLoading, isEnd, rooms, pageLimit } =
    useRoomsStore();

  const [socketState, setSocketState] = useState<SocketType>(null);

  const handleGetRooms = (socket = socketState) => {
    //! socket loading and loading more chat rooms
    if (socket && socket.connected && !isEnd) {
      dispatch(roomsChangePage());
    }
  };

  const handleSocketConnect = async () => {
    socketState?.connect();
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
      path: SOCKET_PATH_URL,
      query: {
        role: "admin",
        userId: ADMIN_ID,
        customRoomName: ADMIN_ALL_ROOM_NAME,
        email: getSessionItem(SessionStorageEnum.EMAIL),
        password: getSessionItem(SessionStorageEnum.PASSWORD),
      },
    });

    //! connect
    socket.on("connect", () => {
      //! connect room
      socket.emit("admin connect all rooms");
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
      setSocketState(socket);
    });

    //! get all rooms
    socket.on("admin get all rooms", (rooms: IRoomModel[]) => {
      dispatch(roomsDataSlice(rooms));
    });

    //! new message
    socket.on("message get admin", (data: IRoomModel) => {
      dispatch(changeMessageInRoom(data));
    });

    //! error
    socket.on("error", (error) => {
      handleError(socket)(error);
    });

    return () => {
      if (socketState) {
        socket.disconnect();
      }
    };
  }, []);

  //! error render
  useEffect(() => {
    if (socketState && isAuth) {
      //! get first rooms
      handleGetRooms();

      //! reconnect in error check handleGetRooms
      socketState.on("connect", () => {
        handleGetRooms();
      });

      //! error reconnect in error check handleGetRooms
      socketState.on("connect_error", () => {
        handleError(socketState)(
          "Ошибка подключения пожалуйста попробуйте подключиться позже",
        );
      });
    }
  }, [socketState, isAuth]);

  //! pagination loading
  //? учтен нестабильный интернет
  useEffect(() => {
    if (socketState && socketState.connected && page && isLoading) {
      socketState.emit("pagination rooms", { page, pageLimit });
    }
  }, [socketState, page, isLoading]);

  return {
    rooms,
    isEnd,
    isLoading,
    hasError,
    handleGetRooms,
    handleSocketConnect,
  };
};
