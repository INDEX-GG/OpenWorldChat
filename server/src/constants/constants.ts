import * as dotenv from "dotenv";
dotenv.config();

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = !IS_DEV;

export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_NAME_MAIN = process.env.DB_NAME_MAIN;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const PORT = process.env.PORT;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const SECRET_KEY = process.env.SECRET_KEY;
export const ADMIN_ALL_ROOM_NAME = process.env.ADMIN_ALL_ROOM_NAME || "";
export const CORS = IS_PROD ? process.env.CORS : "*";
export const ALLOWED_HEADERS_CORS = IS_PROD ? process.env.ALLOWED_HEADERS_CORS : "*";
