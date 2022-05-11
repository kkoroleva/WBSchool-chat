export interface IPrivate {
  _id?: string;
  owners?: string[];
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
  isPrivate: boolean;
}
