export interface IMessage {
    text: string;
    owner?: string;
    _id?: string;
    expiresIn?: string;
    imageOrFile?: string;
    formatImage?: string;
    chatId?: string;
    username?: string;
    avatar?: string;
    lastMessage?: string;
}

export interface User {
    _id: string;
    username: string;
    avatar: string;
    email?: string;
    about?: string;
    formatImage:string;
}

export interface IAvatars {
    ownerFormatImage?: string,
    ownerAvatar?: string,
    formatImage?: boolean,
    avatar?: string,
  }

export interface IChatInfo {
    _id: string,
    name: string,
    avatars?: IAvatars[],
    formatImage: string,
    about: string,
    isNotifications: boolean,
    isRead: boolean,
    isActive: boolean,
    owners: string[], 
    __v: number, 
    chatGroup: string,
    avatar : string,
    users: string[],
    usernames: string[]
  }