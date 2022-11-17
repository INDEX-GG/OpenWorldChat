import { useAppSelector } from "hooks/store/useStore";
import { selectChat } from "store/reducers/chatSlice/chatSlice";

export const useChatStore = () => {
  const { messages, room } = useAppSelector(selectChat);

  return {
    room,
    messages,
  };
};
