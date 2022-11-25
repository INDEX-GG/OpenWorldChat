import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStore } from "store/store";

export type RequestAdminLoginDataType = { email: string; password: string };

export const fetchAdminLogin = createAsyncThunk<
  void,
  RequestAdminLoginDataType,
  IStore
>("authSlice/login", async (data, { extra: api }) => {
  const response = await api.post("/login/", data);
  console.log(response);
});
