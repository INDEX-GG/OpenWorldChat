import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";
import { fetchChatId } from "store/reducers/chatSlice/asyncThunk/chatThunk";
import { IMessageModel } from "lib/models/IMessageModel";

interface IInitialState extends IStatusModel {
  room: IRoomModel | null;
}

const initialState: IInitialState = {
  room: null,
  isLoading: true,
  hasError: "",
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    chatReset: () => initialState,
    chatConnect(state, action: PayloadAction<IStatusModel>) {
      state.isLoading = action.payload.isLoading;
      state.hasError = action.payload.hasError;
    },
    chatAddMessage(state, action: PayloadAction<IMessageModel>) {
      if (state.room) {
        state.room = {
          ...state.room,
          messages: [...state.room.messages, action.payload],
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatId.fulfilled, (state, action) => {
      state.room = action.payload as IRoomModel;
    });
    builder.addCase(fetchChatId.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = action.payload as string;
    });
    builder.addCase(fetchChatId.pending, (state) => {
      state.isLoading = true;
      state.hasError = "";
      state.room = null;
    });
  },
});

export const { chatConnect, chatReset, chatAddMessage } = chatSlice.actions;

const selectChatSlice = (state: RootState) => state[RootReducerNameSpace.CHAT];
export const selectChat = (state: RootState) => selectChatSlice(state);
