import { IUserModel } from "./IUserModel";

export type RoomConnectType = {
    role: "user" | "admin",
    userId: number,
    authToken?: string,
    servicesId?: number,
    services_name?: string,
    customRoomName?: string;
    email?: string;
    password?: string
}

export type PaginationType = {
    page: number;
    pageLimit: number;
}

export type ErrorEmitFuncType = (message: string) => void;

export type AdminNewMessageType = {
    roomId: number, 
    userId: number, 
    adminId: number, 
    message: string
    servicesId: number,
}

export type UserChangeType = Pick<IUserModel, "id"> & Partial<Pick<IUserModel,  "name" | "lastname" | "patronymic" | "phone">>