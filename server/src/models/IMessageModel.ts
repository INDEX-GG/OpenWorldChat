import {IUserModel} from "./IUserModel";

export interface IMessageModel {
  text: string;
  userInfo: IUserModel,
}
