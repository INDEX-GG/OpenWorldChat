import { useAppSelector } from "hooks/store/useStore";
import { selectChat } from "store/reducers/chatSlice/chatSlice";

export const useChatStore = () => {
  const { messages, room, isLoading, hasError } = useAppSelector(selectChat);

  return {
    room,
    messages,
    isLoading,
    hasError,
  };
};
