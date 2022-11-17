// import { IUserModel } from "lib/models/IUserModel";
// import { IRoomModel } from "lib/models/IRoomModel";
//
// export interface IMessageModel {
//   user: IUserModel;
//   room: IRoomModel;
//   created_at: string;
//   text: string;
// }

export interface IMessageModel {
  id: number;
  text: string;
  date: string;
}
