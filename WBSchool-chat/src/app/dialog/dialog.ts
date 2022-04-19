export interface IMessage {
    text:string;
    owner?:string; 
    _id?:string;
    expiresIn?:string;
    imageOrFile?: string;
    formatImage?: string;
}

export interface User {
    _id:string;
    username:string;
    avatar:string;
    email:string;
    about:string;
}

