import { IRoomModel } from "lib/models/IRoomModel";
import { SocketType } from "types/types";

export interface IChatContent {
  room: IRoomModel;
  socketState: SocketType;
}
