import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageModel } from "lib/models/IMessageModel";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";

interface IInitialState extends IStatusModel {
  room: IRoomModel | null;
  messages: IMessageModel[] | null;
}

const initialState: IInitialState = {
  room: null,
  messages: null,
  isLoading: true,
  hasError: "",
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    chatConnect(state, action: PayloadAction<IStatusModel>) {
      state.isLoading = action.payload.isLoading;
      state.hasError = action.payload.hasError;
    },
  },
});

export const { chatConnect } = chatSlice.actions;

const selectChatSlice = (state: RootState) => state[RootReducerNameSpace.CHAT];
export const selectChat = (state: RootState) => selectChatSlice(state);
