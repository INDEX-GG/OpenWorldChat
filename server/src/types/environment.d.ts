// @ts-ignore
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME_MAIN: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: string;
      PORT: string;
    }
  }
}

export {};
