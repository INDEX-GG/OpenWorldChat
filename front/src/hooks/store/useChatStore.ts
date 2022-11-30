import { useAppDispatch, useAppSelector } from "hooks/store/useStore";
import { chatReset, selectChat } from "store/reducers/chatSlice/chatSlice";
import {
  fetchChatId,
  FetchChatIdRequest,
} from "store/reducers/chatSlice/asyncThunk/chatThunk";

export const useChatStore = () => {
  const { room, isLoading, hasError } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  const handleGetCurrentChatInfo = (data: FetchChatIdRequest) => {
    dispatch(fetchChatId(data));
  };

  const handleResetChat = () => {
    dispatch(chatReset());
  };

  return {
    room,
    isLoading,
    hasError,
    handleResetChat,
    handleGetCurrentChatInfo,
  };
};
