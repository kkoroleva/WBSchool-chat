export interface IComment {
  authorID?: string;
  authorName?: string;
  date?: string;
  imageOrFile?: string;
  formatImage?: string;
  text: string;
}

export interface IThread {
  _id: string;
  ownerID: string;
  ownerName: string;
  ownerThumbnail: string;
  isActive: true;
  basicPost: {
    date: string;
    img?: string;
    text?: string;
  };
  comments: IComment[];
}
