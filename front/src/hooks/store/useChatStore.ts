import { useAppDispatch, useAppSelector } from "hooks/store/useStore";
import {
  chatAddMessage,
  chatConnect,
  chatReset,
  selectChat,
} from "store/reducers/chatSlice/chatSlice";
import {
  fetchChatId,
  FetchChatIdRequest,
} from "store/reducers/chatSlice/asyncThunk/chatThunk";
import { IStatusModel } from "lib/models/IStatusModel";
import { IMessageModel } from "lib/models/IMessageModel";

export const useChatStore = () => {
  const { room, isLoading, hasError } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  const handleGetCurrentChatInfo = (data: FetchChatIdRequest) => {
    dispatch(fetchChatId(data));
  };

  const handleResetChat = () => {
    dispatch(chatReset());
  };

  const handleChangeStatusChat = (data: IStatusModel) => {
    dispatch(chatConnect(data));
  };

  const handleAddNewMessage = (data: IMessageModel) => {
    dispatch(chatAddMessage(data));
  };

  return {
    room,
    isLoading,
    hasError,
    handleResetChat,
    handleAddNewMessage,
    handleChangeStatusChat,
    handleGetCurrentChatInfo,
  };
};
