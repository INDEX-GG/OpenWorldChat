import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStore } from "store/store";
import { ICallback } from "types/types";
import { fetchCatchError } from "lib/fetch/fetch";
import {
  cryptoData,
  saveAuthDataInSessionStorage,
} from "lib/services/services";

export type RequestAdminLoginDataType = {
  email: string;
  password: string;
} & Pick<ICallback, "rejectCallback">;

export type ResponseAdminLoginDataType = { isAuth?: boolean };

export const fetchAdminLogin = createAsyncThunk<
  ResponseAdminLoginDataType,
  RequestAdminLoginDataType,
  IStore
>(
  "authSlice/login",
  async ({ rejectCallback, ...sendData }, { extra: api, rejectWithValue }) => {
    try {
      const cryptoEmail = cryptoData(sendData.email);
      const cryptoPassword = cryptoData(sendData.password);

      const response = await api.post("/login/", {
        email: cryptoEmail,
        password: cryptoPassword,
      });

      switch (response.status) {
        case 200:
          saveAuthDataInSessionStorage(cryptoEmail, cryptoPassword);
      }

      return response.data;
    } catch (e) {
      fetchCatchError(e, rejectCallback);
    }
  },
);
