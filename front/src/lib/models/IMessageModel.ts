// import { IUserModel } from "lib/models/IUserModel";
// import { IRoomModel.ts } from "lib/models/IRoomModel.ts";
//
// export interface IMessageModel {
//   user: IUserModel;
//   room: IRoomModel.ts;
//   created_at: string;
//   text: string;
// }

export interface IMessageModel {
  id: number;
  text: string;
  date: string;
}
