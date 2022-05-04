export interface IMessage {
    text: string;
    owner?: string;
    _id?: string;
    expiresIn?: string;
    imageOrFile?: string;
    formatImage?: string;
    chatId?: string;
    username?: string;
    avatar?: string;  //???? Не приходят и не заполняются
    lastMessage?: string; // ваще зачем?
}

export interface User {
    _id: string;
    username: string;
    avatar: string;
    email?: string;
    about?: string;
    formatImage:string;
}

