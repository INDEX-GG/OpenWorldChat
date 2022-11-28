import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";
import { IMessageModel } from "lib/models/IMessageModel";
import { roomsCopyArr } from "lib/services/services";

interface IInitialState extends IStatusModel {
  rooms: IRoomModel[];
  page: number;
  pageLimit: number;
}

const initialState: IInitialState = {
  rooms: [],
  isLoading: true,
  hasError: "",
  page: 1,
  pageLimit: 1,
};

export const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {
    roomsLoadingSlice(state) {
      state.isLoading = true;
      state.hasError = "";
    },
    roomsErrorSlice(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.rooms = [];
      state.page = 1;
      state.hasError = action.payload;
    },
    roomsDataSlice(state, action: PayloadAction<IRoomModel[]>) {
      state.rooms = action.payload;
      state.isLoading = false;
      state.hasError = "";
      state.page += 1;
    },
    singleRoomDataSlice(state, action: PayloadAction<IRoomModel>) {
      state.rooms = [...state.rooms, action.payload];
    },
    changeMessageInRoom(state, action: PayloadAction<IMessageModel>) {
      try {
        const message = action.payload;
        const copyRooms = roomsCopyArr(state.rooms);
        const beforeRooms = roomsCopyArr(copyRooms);
        const afterRooms = roomsCopyArr(copyRooms);
        const roomIndex = copyRooms.findIndex(
          (item) => item.id === message.roomId,
        );
        // ! find index
        if (roomIndex >= 0) {
          //! current room
          const currentRoom = copyRooms[roomIndex] as IRoomModel;
          if (currentRoom) {
            const modifyCurrentRoom = {
              ...currentRoom,
              messages: [...currentRoom.messages, message],
            } as IRoomModel;
            state.rooms = [
              ...beforeRooms.slice(0, roomIndex),
              modifyCurrentRoom,
              ...afterRooms.slice(roomIndex + 1),
            ];
          }
        }
      } catch (e) {
        throw new Error("error change rooms");
      }
    },
  },
});

export const {
  roomsDataSlice,
  roomsLoadingSlice,
  roomsErrorSlice,
  changeMessageInRoom,
  singleRoomDataSlice,
} = roomsSlice.actions;

const selectRoomsSlice = (state: RootState) =>
  state[RootReducerNameSpace.ROOMS];
export const selectRooms = (state: RootState) => selectRoomsSlice(state);
