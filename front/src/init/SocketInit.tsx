import React from "react";
// import { useAuthStore } from "hooks/store/useAuthStore";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000/");

const SocketInit = () => {
  // const { isAuth } = useAuthStore();
  // if (!isAuth) return null;/**/
  console.log(123);

  return null;
};

export default React.memo(SocketInit);
