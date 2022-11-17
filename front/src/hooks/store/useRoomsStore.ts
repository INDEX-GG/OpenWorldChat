import { useAppSelector } from "hooks/store/useStore";
import { selectRooms } from "store/reducers/roomsSlice/roomsSlice";

export const useRoomsStore = () => {
  const { rooms, isLoading, hasError } = useAppSelector(selectRooms);
  return {
    rooms,
    isLoading,
    hasError,
  };
};
