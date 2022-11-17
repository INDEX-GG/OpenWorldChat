import { ITokens } from "types/types";

export const setStorageTokens = ({ refresh, access }: ITokens) => {
  sessionStorage.setItem("@access", access);
  sessionStorage.setItem("@refresh", refresh);
  localStorage.setItem("@refresh", refresh);
};

export const getStorageTokens = () => ({
  sessionAccess: sessionStorage.getItem("@access"),
  sessionRefresh: sessionStorage.getItem("@refresh"),
  localRefresh: localStorage.getItem("@refresh"),
});

export const clearStorageTokens = () => {
  sessionStorage.removeItem("@access");
  sessionStorage.removeItem("@refresh");
  localStorage.removeItem("@refresh");
};
