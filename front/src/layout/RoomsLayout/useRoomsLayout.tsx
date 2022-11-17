import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const useRoomsLayout = (isOverflowScroll: boolean) => {
  const { roomId } = useParams();
  const roomsScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const asideDom = roomsScrollRef.current;
    if (isOverflowScroll && asideDom && roomId && !isNaN(+roomId)) {
      asideDom.scrollTop = (+roomId - 1) * 61;
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return {
    roomsScrollRef,
  };
};
