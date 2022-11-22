import {IUserModel} from "./IUserModel";

export interface IMessageModel {
  message: string;
  userInfo: IUserModel,
}
