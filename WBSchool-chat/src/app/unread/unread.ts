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

export interface Contact {
  _id: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  lastActive?: string;
}
