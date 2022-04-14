import { IUser } from './user';
export interface IGroup {
  _id?: string;
  name: string;
  about?: string;
  owner?: string;
  lastMessage?: string;
  avatar?: string;
  users?: IUser[];
}
