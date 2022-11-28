import React from "react";
import ButtonUI from "UI/ButtonUI/ButtonUI";

interface IRoomsLoadingProps {
  handleGetRooms: () => void;
}

const RoomsLoading = ({ handleGetRooms }: IRoomsLoadingProps) => {
  return <ButtonUI onClick={handleGetRooms}>Загрузить ещё</ButtonUI>;
};

export default React.memo(RoomsLoading);
