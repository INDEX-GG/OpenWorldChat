import React from "react";
import RoutesLayout from "layout/RoutesLayout/RoutesLayout";
import SessionInit from "../../init/SessionInit";
import SocketInit from "../../init/SocketInit";

const MainLayout = () => {
  return (
    <>
      <RoutesLayout />
      <SessionInit />
      <SocketInit />
    </>
  );
};

export default React.memo(MainLayout);
