import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { RootReducerNameSpace } from "../../rootReducer";
import {
  fetchAdminLogin,
  ResponseAdminLoginDataType,
} from "store/reducers/authSlice/asynThunk/asynThunk";

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
  extraReducers: (builder) => {
    builder.addCase(
      fetchAdminLogin.fulfilled,
      (state, action: PayloadAction<ResponseAdminLoginDataType>) => {
        if (action.payload?.isAuth) {
          state.isAuth = true;
        }
      },
    );
  },
});

export const { changeAuth } = authSlice.actions;

const selectAuthSlice = (state: RootState) => state[RootReducerNameSpace.AUTH];
export const selectAuth = (state: RootState) => selectAuthSlice(state);
