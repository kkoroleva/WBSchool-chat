export interface IGroup {
  _id?: string;
  name: string;
  about?: string;
  owners?: string[];
  lastMessage?: string;
  avatar?: string;
  users?: string[];
  formatImage?: string;
}

export interface IGroupsMessages {
  chatId: string;
  lastMessage: string;
  messageId: string;
}
