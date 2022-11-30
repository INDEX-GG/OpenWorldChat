import { SECRET_KEY } from "lib/constants/constants";
import CryptoJS from "crypto-js";
import { IChatRoom, IRoomModel } from "lib/models/IRoomModel";
import { SessionStorageEnum } from "types/types";

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

export const getRusDateDay = (date: string) => {
  return new Date(date).toLocaleString("ru-RU", {
    dateStyle: "short",
  });
};

export const getRusDateMessage = (date: string) => {
  return new Date(date).toLocaleString("ru-RU", {
    timeStyle: "short",
  });
};

export const getUniqueRooms = (
  ...arrays: (IRoomModel | string)[][]
): string[] => {
  const uniqueRooms = new Set<string>();
  //! exclude id
  const excludePrevRoomId: number[] = [];

  //! rest operator, all count arrays
  arrays.forEach((roomArray) => {
    //! check correct arr
    if (Array.isArray(roomArray)) {
      //! map inner arr
      roomArray.forEach((roomItem) => {
        if (roomItem) {
          //! create unique room
          let uniqRoom = null;
          //! room = string || object
          if (typeof roomItem === "string") {
            //? STRING
            //! parse json string to json IChatRoom
            const parseRoom = JSON.parse(roomItem) as IChatRoom;
            //! push excludes id
            excludePrevRoomId.push(parseRoom.room.id);
            //! add unique room (type string)
            uniqRoom = roomItem;
            //? STRING
          } else {
            //? OBJECT
            //! check new room in state
            const roomIsState = excludePrevRoomId.find(
              (item) => item === roomItem.id,
            );

            if (!roomIsState) {
              //! new unique room
              uniqRoom = JSON.stringify({
                room: roomItem,
                status: 1,
              } as IChatRoom);
            }
            //? OBJECT
          }

          //! add !new! unique room (type string)
          if (uniqRoom) {
            uniqueRooms.add(uniqRoom);
          }
        }
      });
    }
  });
  return Array.from(uniqueRooms);
};

export const getSessionItem = (item: SessionStorageEnum) =>
  sessionStorage.getItem(item);

export const roomsCopyArr = (rooms: string[]): string[] =>
  JSON.parse(JSON.stringify(rooms));
