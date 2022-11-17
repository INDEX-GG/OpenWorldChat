import { createSlice } from "@reduxjs/toolkit";
import { IMessageModel } from "lib/models/IMessageModel";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";

type Room = IRoomModel & IStatusModel;

interface IInitialState {
  room: Room | null;
  messages: IMessageModel[] | null;
}

const initialState: IInitialState = {
  room: null,
  messages: null,
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
});

const selectChatSlice = (state: RootState) => state[RootReducerNameSpace.CHAT];
export const selectChat = (state: RootState) => selectChatSlice(state);
