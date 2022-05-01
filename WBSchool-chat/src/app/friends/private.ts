export interface IPrivate {
  _id?: string;
  owner?: string;
  isActive?: boolean;
  isRead: boolean;
  avatars: any[];
  avatar?: string;
  users: string[];
  lastActive?: string;
  lastMessage?: string;
  name?: string;
  formatImage?: string;
  usernames: string[];
}
