import { useAppSelector } from "hooks/store/useStore";
import { selectRooms } from "store/reducers/roomsSlice/roomsSlice";

export const useRoomsStore = () => {
  const { rooms, isLoading, hasError, page, pageLimit } =
    useAppSelector(selectRooms);
  return {
    page,
    rooms,
    isLoading,
    hasError,
    pageLimit,
  };
};
