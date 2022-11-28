import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";
import { IMessageModel } from "lib/models/IMessageModel";
import { roomsCopyArr } from "lib/services/services";

const pageLimit = 1;

interface IInitialState extends IStatusModel {
  rooms: IRoomModel[];
  page: number;
  pageLimit: number;
  isEnd: boolean;
  isSocketConnect: boolean;
}

const initialState: IInitialState = {
  rooms: [],
  isLoading: true,
  hasError: "",
  page: 1,
  pageLimit,
  isEnd: false,
  isSocketConnect: false,
};

export const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {
    roomsChangeSocketConnect(state, action: PayloadAction<boolean>) {
      state.isSocketConnect = action.payload;
    },
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
      state.rooms = [...state.rooms, ...action.payload];
      state.isLoading = false;
      state.hasError = "";
      state.page += 1;
      state.isEnd = action.payload.length < pageLimit;
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
  roomsChangeSocketConnect,
} = roomsSlice.actions;

const selectRoomsSlice = (state: RootState) =>
  state[RootReducerNameSpace.ROOMS];
export const selectRooms = (state: RootState) => selectRoomsSlice(state);
