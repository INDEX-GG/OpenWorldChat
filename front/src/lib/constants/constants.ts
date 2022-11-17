export const IS_DEV = process.env.NODE_ENV === "development";
export const TOKEN_UPDATE_TIMEOUT = IS_DEV ? 1500000 : 30000;
export const TIMEOUT = 5000;
export const ADMIN_ID = 1;

export const BASE_URL =
  "http://192.168.88.25:8000" || process.env.REACT_APP_BASE_URL;
export const API_URL = BASE_URL + "/api/v1";
