import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";
import { fetchChatId } from "store/reducers/chatSlice/asyncThunk/chatThunk";

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
    chatConnect(state, action: PayloadAction<IStatusModel>) {
      state.isLoading = action.payload.isLoading;
      state.hasError = action.payload.hasError;
    },
    chatReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatId.fulfilled, (state, action) => {
      state.isLoading = false;
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

export const { chatConnect, chatReset } = chatSlice.actions;

const selectChatSlice = (state: RootState) => state[RootReducerNameSpace.CHAT];
export const selectChat = (state: RootState) => selectChatSlice(state);
