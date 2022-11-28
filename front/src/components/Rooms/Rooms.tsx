import React from "react";
import RoomsList from "components/Rooms/RoomsList/RoomsList";
import SpinnerUI from "UI/SpinnerUI/SpinnerUI";
import RoomsError from "components/Rooms/RoomsError/RoomsError";
import { styled } from "@mui/material";
import { useRoomsStore } from "hooks/store/useRoomsStore";

const Rooms = () => {
  const { rooms, isLoading, hasError } = useRoomsStore();

  return (
    <>
      {!!rooms.length && <RoomsList data={rooms} />}
      {(isLoading || hasError) && (
        <BottomContainerSC>
          {isLoading && !hasError && <SpinnerUI />}
          {hasError && <RoomsError error={hasError} />}
        </BottomContainerSC>
      )}
    </>
  );
};

const BottomContainerSC = styled("div")`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

export default React.memo(Rooms);
