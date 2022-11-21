import {IUserModel} from "./IUserModel";

export interface IMessageModel {
  text: string;
  createdAt: string;
  userInfo: IUserModel,
}
