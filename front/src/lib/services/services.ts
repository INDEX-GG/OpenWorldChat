import { SECRET_KEY } from "lib/constants/constants";
import CryptoJS from "crypto-js";
import { IRoomModel } from "lib/models/IRoomModel";

const secret = SECRET_KEY as string;

export const cryptoData = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(data, secret);
  return encrypted + "";
};

const decryptedData = (data: string) =>
  CryptoJS.AES.decrypt(data, SECRET_KEY as string).toString(CryptoJS.enc.Utf8);

export const saveAuthDataInSessionStorage = (
  email: string,
  password: string,
) => {
  sessionStorage.setItem("@email", email);
  sessionStorage.setItem("@password", password);
};

export const getAuthDataInSessionStorage = () => {
  try {
    const email = decryptedData(sessionStorage.getItem("@email") as string);
    const password = decryptedData(
      sessionStorage.getItem("@password") as string,
    );

    return {
      email,
      password,
    };
  } catch (e) {
    return {
      email: "",
      password: "",
    };
  }
};

export const getRusDate = (date: string) => {
  return new Date(date).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const getUniqueRooms = (
  ...arrays: (IRoomModel | string)[][]
): string[] => {
  const uniqueRooms = new Set<string>();

  arrays.forEach((roomArray) => {
    if (roomArray.length) {
      roomArray.forEach((room) => {
        if (room) {
          uniqueRooms.add(
            typeof room === "string" ? room : JSON.stringify(room),
          );
        }
      });
    }
  });

  return Array.from(uniqueRooms);
};

export const roomsCopyArr = (rooms: string[]): IRoomModel[] =>
  JSON.parse(JSON.stringify(rooms));
