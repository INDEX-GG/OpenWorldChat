import { createSlice } from "@reduxjs/toolkit";
import { IRoomModel } from "lib/models/IRoomModel";
import { roomsArr } from "lib/mock/rooms";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";

interface IInitialState extends IStatusModel {
  rooms: IRoomModel[];
}

const initialState: IInitialState = {
  rooms: roomsArr,
  isLoading: false,
  hasError: "",
};

export const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => undefined,
});

const selectRoomsSlice = (state: RootState) =>
  state[RootReducerNameSpace.ROOMS];
export const selectRooms = (state: RootState) => selectRoomsSlice(state);
