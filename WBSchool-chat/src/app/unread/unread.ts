export interface IUnread {
  _id: string;
  name: string;
  owner: string;
  users: string[];
  isRead: boolean;
  isActive: boolean;
  newMessages?: number;
  lastActive?: string;
  lastMessage?: string;
  avatar?: string;
}
