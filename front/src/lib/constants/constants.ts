export const IS_DEV = process.env.NODE_ENV === "development";
export const TIMEOUT = 5000;
export const ADMIN_ID = 1;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const BASE_URL = IS_DEV
  ? "http://192.168.88.83:4000"
  : process.env.REACT_APP_BASE_URL;

export const PATH_URL = IS_DEV ? "" : process.env.REACT_APP_PATH_URL || "";
export const API_URL = BASE_URL + PATH_URL;
