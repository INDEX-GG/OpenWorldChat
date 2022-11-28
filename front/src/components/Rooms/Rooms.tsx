import React from "react";
import RoomsList from "components/Rooms/RoomsList/RoomsList";
import SpinnerUI from "UI/SpinnerUI/SpinnerUI";
import RoomsError from "components/Rooms/RoomsError/RoomsError";
import { styled } from "@mui/material";
import RoomsLoading from "components/Rooms/RoomsLoading/RoomsLoading";
import { useSocketInit } from "../../hooks/useSocketInit";

const Rooms = () => {
  const { rooms, isLoading, hasError, isEnd, handleGetRooms } = useSocketInit();

  return (
    <>
      {!!rooms.length && <RoomsList data={rooms} />}
      {(isLoading || hasError) && (
        <BottomContainerSC>
          {isLoading && !hasError && <SpinnerUI />}
          {hasError && !isLoading && <RoomsError error={hasError} />}
        </BottomContainerSC>
      )}
      {!isEnd && (
        <BottomContainerSC>
          <RoomsLoading handleGetRooms={handleGetRooms} />
        </BottomContainerSC>
      )}
    </>
  );
};

const BottomContainerSC = styled("div")`
  display: flex;
  justify-content: center;
  margin: 15px auto 0;
  max-width: 200px;
`;

export default React.memo(Rooms);
