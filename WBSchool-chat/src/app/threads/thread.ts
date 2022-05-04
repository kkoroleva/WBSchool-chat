export interface IComment {
  authorID?: string;
  authorName?: string;
  post?: {
    date?: string;
    img?: string;
    text?: string;
  }
}

export interface IThread {
  ownerID: string;
  ownerName: string;
  ownerThumbnail: string;
  isActive: boolean;
  basicPost: {
    date: string;
    img?: string;
    text?: string;
  }
  comments: IComment[];
}
