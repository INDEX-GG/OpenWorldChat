import React from "react";
import RoutesLayout from "layout/RoutesLayout/RoutesLayout";
import SessionInit from "../../init/SessionInit";
import SocketInit from "../../init/SocketInit";
import { useAuthStore } from "hooks/store/useAuthStore";

const MainLayout = () => {
  const { isAuth } = useAuthStore();
  return (
    <>
      <RoutesLayout />
      <SessionInit />
      {isAuth && <SocketInit />}
    </>
  );
};

export default React.memo(MainLayout);
