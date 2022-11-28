import * as dotenv from "dotenv";
dotenv.config();

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
export const SOCKET_ADMIN_ALL_ROOMS = "SOCKET_ADMIN_ALL_ROOMS" 


