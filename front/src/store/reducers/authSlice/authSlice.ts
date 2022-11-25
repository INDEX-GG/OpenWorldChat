import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { RootReducerNameSpace } from "../../rootReducer";

interface IInitialState {
  isAuth: boolean | null;
}

const initialState: IInitialState = {
  isAuth: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    changeAuth(state) {
      state.isAuth = false;
    },
  },
});

export const { changeAuth } = authSlice.actions;

const selectAuthSlice = (state: RootState) => state[RootReducerNameSpace.AUTH];
export const selectAuth = (state: RootState) => selectAuthSlice(state);
