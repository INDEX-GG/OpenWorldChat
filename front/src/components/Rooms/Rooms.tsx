import React, { useMemo } from "react";
import RoomsList from "components/Rooms/RoomsList/RoomsList";
import SpinnerUI from "UI/SpinnerUI/SpinnerUI";
import RoomsError from "components/Rooms/RoomsError/RoomsError";
import RoomsLoading from "components/Rooms/RoomsLoading/RoomsLoading";
import { useSocketInit } from "hooks/useSocketInit";
import { useRoomsStyles } from "components/Rooms/style";
import RoomsEnd from "components/Rooms/RoomsEnd/RoomsEnd";

const Rooms = () => {
  const {
    rooms,
    isLoading,
    hasError,
    isEnd,
    handleGetRooms,
    handleSocketConnect,
  } = useSocketInit();

  const isListComponent = useMemo(() => !!rooms.length, [rooms]);

  const isDefaultStatus = useMemo(
    () => isLoading || hasError || isEnd,
    [isLoading, hasError, isEnd],
  );

  const isLoadingComponent = useMemo(
    () => isLoading && !hasError,
    [isLoading, hasError],
  );

  const isErrorComponent = useMemo(
    () => hasError && !isLoading,
    [hasError, !isLoading],
  );

  const isEndComponent = useMemo(
    () => isEnd && !hasError && !isLoading,
    [isEnd, hasError, isLoading],
  );

  const isGetRoomsComponent = useMemo(
    () => !isEnd && !isLoading && !hasError,
    [hasError, isLoading, isEnd],
  );

  return (
    <>
      {isListComponent && <RoomsList data={rooms} />}
      {isDefaultStatus && (
        <BottomContainerSC>
          {isLoadingComponent && <SpinnerUI />}
          {isErrorComponent && (
            <RoomsError
              error={hasError}
              handleSocketConnect={handleSocketConnect}
            />
          )}
          {isEndComponent && <RoomsEnd />}
        </BottomContainerSC>
      )}
      {isGetRoomsComponent && (
        <BottomContainerSC>
          <RoomsLoading handleGetRooms={handleGetRooms} />
        </BottomContainerSC>
      )}
    </>
  );
};

const { BottomContainerSC } = useRoomsStyles();

export default React.memo(Rooms);
