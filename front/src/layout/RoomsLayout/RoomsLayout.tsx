import React from "react";
import Rooms from "components/Rooms/Rooms";
import { IChatLayoutProps } from "layout/RoomsLayout/types";
import { useRoomsLayoutStyles } from "layout/RoomsLayout/styles";
import { useRoomsLayout } from "layout/RoomsLayout/useRoomsLayout";

const RoomsLayout = ({ children, isOverflowScroll }: IChatLayoutProps) => {
  const { roomsScrollRef } = useRoomsLayout(isOverflowScroll);

  return (
    <MainSC>
      <AsideSC ref={roomsScrollRef} isOverflowScroll={isOverflowScroll}>
        <Rooms />
      </AsideSC>
      <SectionSC>{children}</SectionSC>
    </MainSC>
  );
};

const { MainSC, SectionSC, AsideSC } = useRoomsLayoutStyles();

export default React.memo(RoomsLayout);
