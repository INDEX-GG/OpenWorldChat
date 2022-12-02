import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStore } from "store/store";
import { getSessionItem } from "lib/services/services";
import { SessionStorageEnum } from "types/types";
import { IRoomModel } from "lib/models/IRoomModel";
import { ADMIN_ID } from "lib/constants/constants";

export type FetchChatIdRequest = { roomId: number };
export type FetchChatIdResponse = IRoomModel | string;

export const fetchChatId = createAsyncThunk<
  FetchChatIdResponse,
  FetchChatIdRequest,
  IStore
>(
  "chatSlice/fetchChatId",
  async ({ roomId }, { extra: api, rejectWithValue, getState }) => {
    try {
      //! get auth
      const {
        AUTH: { isAuth },
      } = getState();

      if (isAuth) {
        const response = await api.post(`/chat/${roomId}`, {
          //! admin id
          id: ADMIN_ID,
          email: getSessionItem(SessionStorageEnum.EMAIL),
          password: getSessionItem(SessionStorageEnum.PASSWORD),
        });

        switch (response.status) {
          case 200:
            return response.data;
        }
        return rejectWithValue("Ошибка загрузки чата");
      } else {
        return rejectWithValue("Ошибка авторизации");
      }
    } catch (e) {
      return rejectWithValue("Ошибка загрузки чата");
    }
  },
);
