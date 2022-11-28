import React from "react";
import RoutesLayout from "layout/RoutesLayout/RoutesLayout";
import SessionInit from "../../init/SessionInit";

const MainLayout = () => {
  return (
    <>
      <RoutesLayout />
      <SessionInit />
    </>
  );
};

export default React.memo(MainLayout);
