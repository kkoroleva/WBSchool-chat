export interface IMessage {
    text:string;
    owner:string; 
    _id:string;
    expiresIn:string;
    imageOrFile?: string;
    formatImage?: string;
}

