export interface IFriend {
  _id: string;
  owner: string;
  isActive?: boolean;
  isRead: boolean;
  thumbnail?: string;
  users: string[];
  lastActive?: string;
  lastMessage?: string;
}
