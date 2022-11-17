import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { RootReducerNameSpace } from "../../rootReducer";
import { fetchTokenRefresh } from "./asynThunk/asynThunk";
import { ResponseFetchRefresh } from "./asynThunk/types";
import { ITokens } from "types/types";

interface IInitialState extends ITokens {
  isAuth: boolean | null;
}

const initialState: IInitialState = {
  access: "",
  refresh: "",
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
    builder.addCase(fetchTokenRefresh.rejected, (state) => {
      state.isAuth = false;
      state.refresh = "";
      state.access = "";
    });
    builder.addCase(
      fetchTokenRefresh.fulfilled,
      (state, action: PayloadAction<ResponseFetchRefresh>) => {
        if (action.payload) {
          state.isAuth = true;
          state.refresh = action.payload.refresh;
          state.access = action.payload.access;
        }
      },
    );
  },
});

export const { changeAuth } = authSlice.actions;

const selectAuthSlice = (state: RootState) => state[RootReducerNameSpace.AUTH];
export const selectAuth = (state: RootState) => selectAuthSlice(state);
