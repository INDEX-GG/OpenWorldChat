// @ts-ignore
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: string;
      PORT: string;
      ADMIN_EMAIL: string;
      ADMIN_PASSWORD: string;
      SECRET_KEY: string;
      ADMIN_ALL_ROOM_NAME: string;
      CORS: string,
      ALLOWED_HEADERS_CORS: string;
    }
  }
}

export {};
