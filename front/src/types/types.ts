export type FetchRejectCallback = (error: Error) => void;

export enum SessionStorageEnum {
  EMAIL = "@email",
  PASSWORD = "@password",
}

export interface ICallback {
  successCallback: () => void;
  rejectCallback: FetchRejectCallback;
}

export interface IError {
  isError: boolean;
  message: string;
}
