import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { createApi } from "../lib/http/http";
import { AxiosInstance } from "axios";

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IStore {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}
