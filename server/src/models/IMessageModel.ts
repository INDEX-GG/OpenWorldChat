import {IUserModel} from "./IUserModel";

export interface IMessageModel {
  date: string;
  text: string;
  userInfo: IUserModel,
}
