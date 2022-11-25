import { useAppDispatch, useAppSelector } from "./useStore";
import { changeAuth, selectAuth } from "store/reducers/authSlice/authSlice";
import {
  fetchAdminLogin,
  RequestAdminLoginDataType,
} from "store/reducers/authSlice/asynThunk/asynThunk";

export const useAuthStore = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleNotAuth = () => {
    dispatch(changeAuth());
  };

  const handleLoginUser = (data: RequestAdminLoginDataType) => {
    dispatch(fetchAdminLogin(data));
  };

  return {
    isAuth,
    handleNotAuth,
    handleLoginUser,
  };
};
