import {IUserModel} from "./IUserModel";

export interface IMessageModel {
  roomId: number;
  message: string;
  userInfo: IUserModel,
}
