import { ICallback, ITokens } from "types/types";
import { ISignInModel } from "lib/models/IFormModels";

export type RequestFetchUserAuth = ISignInModel &
  Pick<ICallback, "rejectCallback">;
export type ResponseFetchUserAuth = ITokens | void;

export type RequestFetchUserLogout = Pick<ITokens, "refresh"> &
  Pick<ICallback, "successCallback">;

export type RequestFetchRefresh = Pick<ITokens, "refresh">;
export type ResponseFetchRefresh = ITokens | void;
