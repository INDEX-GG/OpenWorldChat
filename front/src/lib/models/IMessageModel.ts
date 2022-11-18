// import { IUserModel } from "lib/modules/IUserModel";
// import { IRoomModel } from "lib/modules/IRoomModel";
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
