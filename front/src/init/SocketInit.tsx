import React from "react";
import { useAuthStore } from "hooks/store/useAuthStore";
import { io } from "socket.io-client";

const SocketInit = () => {
  const { isAuth } = useAuthStore();
  // if (!isAuth) return null;/**/
  const socket = io("http://localhost:8000/");

  return null;
};

export default React.memo(SocketInit);
