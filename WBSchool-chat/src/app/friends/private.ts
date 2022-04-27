export interface IPrivate {
  _id?: string;
  owner?: string;
  isActive?: boolean;
  isRead: boolean;
  avatar?: string;
  users: string[];
  lastActive?: string;
  lastMessage?: string;
  name?: string;
  formatImage?: string;
  usernames: string[];
}