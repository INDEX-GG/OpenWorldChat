import { IMessageModel } from "lib/models/IMessageModel";

export interface IChatMessageDateProps {
  currentMessage: IMessageModel;
  prevMessage: IMessageModel | undefined;
}
