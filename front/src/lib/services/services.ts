import { SECRET_KEY } from "lib/constants/constants";
import CryptoJS from "crypto-js";

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
