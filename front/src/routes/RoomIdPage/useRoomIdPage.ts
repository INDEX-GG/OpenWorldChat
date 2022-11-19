import { io } from "socket.io-client";
import { useAppDispatch } from "hooks/store/useStore";
import { chatConnect } from "store/reducers/chatSlice/chatSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IStatusModel } from "lib/models/IStatusModel";

export const useRoomIdPage = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();

  const socket = io("http://localhost:7000/", {
    query: {
      roomId,
      authToken: "123",
    },
  });

  const handleChangeChatConnect = (data: IStatusModel) => {
    dispatch(chatConnect(data));
  };

  //! socket connect
  socket.on("connect", () => {
    setTimeout(
      () => handleChangeChatConnect({ isLoading: false, hasError: "" }),
      200,
    );
  });

  //! connect error
  socket.on("connect_error", () => {
    handleChangeChatConnect({
      isLoading: false,
      hasError: "Ошибка подключения к комнате",
    });
  });

  //! disconnect
  useEffect(() => {
    return () => {
      socket.disconnect();
      handleChangeChatConnect({
        isLoading: true,
        hasError: "",
      });
    };
  }, [roomId]);

  return {
    socket,
  };
};
