import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IRoomModel } from "lib/models/IRoomModel";
import { RootState } from "store/store";
import { RootReducerNameSpace } from "store/rootReducer";
import { IStatusModel } from "lib/models/IStatusModel";
import { getUniqueRooms, roomsCopyArr } from "lib/services/services";

const pageLimit = 1;

interface IInitialState extends IStatusModel {
  rooms: string[];
  page: number;
  pageLimit: number;
  isEnd: boolean;
  isSocketConnect: boolean;
}

const initialState: IInitialState = {
  rooms: [],
  isLoading: true,
  hasError: "",
  page: 0,
  pageLimit,
  isEnd: false,
  isSocketConnect: false,
};

export const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {
    roomsChangePage(state) {
      state.page += 1;
      state.isLoading = true;
    },
    roomsChangeSocketConnect(state, action: PayloadAction<boolean>) {
      state.isSocketConnect = action.payload;
    },
    roomsLoadingSlice(state) {
      state.isLoading = true;
      state.hasError = "";
    },
    roomsErrorSlice(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.hasError = action.payload;
    },
    roomsDataSlice(state, action: PayloadAction<IRoomModel[]>) {
      state.rooms = getUniqueRooms(roomsCopyArr(state.rooms), action.payload);
      state.isLoading = false;
      state.hasError = "";
      state.isEnd = action.payload.length < pageLimit;
    },
    changeMessageInRoom(state, action: PayloadAction<IRoomModel>) {
      try {
        let roomIndex = -1;
        const copyRooms = roomsCopyArr(state.rooms);

        if (Array.isArray(copyRooms)) {
          copyRooms.forEach((room, index) => {
            const parsedRoom = JSON.parse(room) as IChatRoom;
            if (parsedRoom.room.id === action.payload.id) {
              roomIndex = index;
            }
          });
        }

        const newRoom = JSON.stringify({ room: action.payload, status: 2 });

        if (roomIndex >= 0) {
          const beforeRooms = JSON.parse(JSON.stringify(copyRooms));
          const afterRooms = JSON.parse(JSON.stringify(copyRooms));

          state.rooms = [
            ...beforeRooms.slice(0, roomIndex),
            newRoom,
            ...afterRooms.slice(roomIndex + 1),
          ];
        } else {
          //! room not found
          state.rooms = [newRoom, ...copyRooms];
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
  roomsChangePage,
  changeMessageInRoom,
  roomsChangeSocketConnect,
} = roomsSlice.actions;

const selectRoomsSlice = (state: RootState) =>
  state[RootReducerNameSpace.ROOMS];
export const selectRooms = (state: RootState) => selectRoomsSlice(state);
