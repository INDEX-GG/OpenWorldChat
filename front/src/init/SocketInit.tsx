import React from "react";
// import { useAuthStore } from "hooks/store/useAuthStore";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000/");
console.log("connected");

const SocketInit = () => {
  // const { isAuth } = useAuthStore();
  // if (!isAuth) return null;/**/

  return null;
};

export default React.memo(SocketInit);
