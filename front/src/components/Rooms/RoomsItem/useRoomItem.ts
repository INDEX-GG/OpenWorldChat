import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export const useRoomItem = (id: number) => {
  const navigate = useNavigate();
  const { roomId } = useParams() || { roomId: "0" };

  const isActive = useMemo(() => (roomId ? +roomId === id : false), [roomId]);
  const handleClickRoom = () => navigate(`/${id}`);

  return {
    isActive,
    handleClickRoom,
  };
};
