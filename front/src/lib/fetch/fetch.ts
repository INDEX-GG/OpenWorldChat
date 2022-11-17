import { ICallback } from "../../types/types";
import axios, { AxiosError } from "axios";

export type FetchCatchErrorFuncType = (
  e: unknown,
  rejectCallback: Pick<ICallback, "rejectCallback">["rejectCallback"],
) => void;

export const fetchCatchError: FetchCatchErrorFuncType = (e, rejectCallback) => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError;
    rejectCallback(error);
    return;
  }
};
