export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = !IS_DEV;
export const TIMEOUT = 5000;
export const ADMIN_ID = +(process.env.REACT_APP_ADMIN_ID || 0);
export const ADMIN_ALL_ROOM_NAME = process.env.REACT_APP_ADMIN_ALL_ROOM_NAME;

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SOCKET_PATH = IS_PROD ? "/socket.io/" : "";
export const PATH_URL = IS_DEV ? "" : process.env.REACT_APP_PATH_URL || "";
export const API_URL = BASE_URL + PATH_URL;
export const PATH_URL_FRONTEND = process.env.REACT_APP_PATH_URL_FRONTEND;
export const SOCKET_PATH_URL = `${PATH_URL}${SOCKET_PATH}`;
