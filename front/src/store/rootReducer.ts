import { combineReducers } from "redux";
import { authSlice } from "./reducers/authSlice/authSlice";
import { chatSlice } from "store/reducers/chatSlice/chatSlice";
import { roomsSlice } from "store/reducers/roomsSlice/roomsSlice";

export enum RootReducerNameSpace {
  AUTH = "AUTH",
  CHAT = "CHAT",
  ROOMS = "ROOMS",
}

export const rootReducer = combineReducers({
  [RootReducerNameSpace.AUTH]: authSlice.reducer,
  [RootReducerNameSpace.CHAT]: chatSlice.reducer,
  [RootReducerNameSpace.ROOMS]: roomsSlice.reducer,
});
