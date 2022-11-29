import { IUserModel } from "lib/models/IUserModel";
import { IMessageModel } from "lib/models/IMessageModel";

export interface IRoomModel {
  id: number;
  adminId: number;
  servicesId: number;
  servicesName: string;
  updatedAt: string;
  createdAt: string;
  userId: string;
  messages: IMessageModel[];
  user: IUserModel;
}

export interface IStatus {
  status: number;
}

export interface IChatRoom extends IStatus {
  room: IRoomModel;
}
