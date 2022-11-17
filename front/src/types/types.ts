export interface ITokens {
  access: string;
  refresh: string;
}

export type FetchRejectCallback = (error: Error) => void;

export interface ICallback {
  successCallback: () => void;
  rejectCallback: FetchRejectCallback;
}

export interface IError {
  isError: boolean;
  message: string;
}
