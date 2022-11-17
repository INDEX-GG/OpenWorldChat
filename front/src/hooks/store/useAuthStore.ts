import { useAppDispatch, useAppSelector } from "./useStore";
import { changeAuth, selectAuth } from "store/reducers/authSlice/authSlice";
import {
  fetchTokenRefresh,
  fetchUserAuth,
  fetchUserLogout,
} from "store/reducers/authSlice/asynThunk/asynThunk";
import {
  RequestFetchRefresh,
  RequestFetchUserAuth,
  RequestFetchUserLogout,
} from "store/reducers/authSlice/asynThunk/types";

export const useAuthStore = () => {
  const { isAuth, access, refresh } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLoginUser = (data: RequestFetchUserAuth) => {
    dispatch(fetchUserAuth(data));
  };

  const handleUserLogout = (data: RequestFetchUserLogout) => {
    dispatch(fetchUserLogout(data));
  };

  const handleRefreshToken = (data: RequestFetchRefresh) => {
    dispatch(fetchTokenRefresh(data));
  };

  const handleChangeAuth = () => {
    dispatch(changeAuth());
  };

  return {
    isAuth,
    access,
    refresh,
    handleLoginUser,
    handleUserLogout,
    handleChangeAuth,
    handleRefreshToken,
  };
};
