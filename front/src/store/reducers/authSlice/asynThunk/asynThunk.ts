import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStore } from "store/store";
import {
  RequestFetchRefresh,
  RequestFetchUserAuth,
  RequestFetchUserLogout,
  ResponseFetchRefresh,
  ResponseFetchUserAuth,
} from "./types";
import { fetchCatchError } from "lib/fetch/fetch";
import { ITokens } from "types/types";
import {
  clearStorageTokens,
  setStorageTokens,
} from "lib/services/storageServices";
import { TOKEN_UPDATE_TIMEOUT } from "lib/constants/constants";

export const fetchTokenRefresh = createAsyncThunk<
  ResponseFetchRefresh,
  RequestFetchRefresh,
  IStore
>(
  "authSlice/fetchRefresh",
  async ({ refresh }, { extra: api, dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<Pick<ITokens, "access">>(
        "/auth/token/refresh/",
        {
          refresh,
        },
      );
      if (response.status === 200) {
        const access = response.data.access;
        setStorageTokens({ refresh, access });

        setTimeout(() => {
          dispatch(fetchTokenRefresh({ refresh }));
        }, TOKEN_UPDATE_TIMEOUT);

        return {
          refresh,
          access,
        };
      }
      return rejectWithValue(undefined);
    } catch (e) {
      fetchCatchError(e, clearStorageTokens);
      return rejectWithValue(undefined);
    }
  },
);

export const fetchUserLogout = createAsyncThunk<
  void,
  RequestFetchUserLogout,
  IStore
>(
  "authSlice/fetchUserLogout",
  async ({ successCallback, refresh }, { extra: api }) => {
    try {
      const {
        data: { access },
      } = await api.post<Pick<ITokens, "access">>("/auth/token/refresh/", {
        refresh,
      });
      await api.post(
        "/auth/admin/logout/",
        { refresh },
        {
          headers: {
            Authorization: `JWT ${access}`,
          },
        },
      );
      successCallback();
    } catch (e) {
      successCallback();
      throw new Error("Ошибка деактивации токена");
    }
  },
);

export const fetchUserAuth = createAsyncThunk<
  ResponseFetchUserAuth,
  RequestFetchUserAuth,
  IStore
>(
  "authSlice/fetchUserAuth",
  async ({ rejectCallback, ...sendData }, { extra: api, dispatch }) => {
    try {
      const response = await api.post<{ tokens: string }>(
        "/auth/admin/login/",
        sendData,
      );
      if (response.status === 200) {
        const { refresh } = JSON.parse(response.data.tokens) as ITokens;
        dispatch(fetchTokenRefresh({ refresh }));
      }
    } catch (e) {
      fetchCatchError(e, rejectCallback);
    }
  },
);
