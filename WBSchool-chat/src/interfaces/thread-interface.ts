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
  owner: string;
  ownerName?: string;
  avatar?: string;
  formatImage?: string;
  isActive?: boolean;
  basicPost: {
    date: string;
    imageOrFile?: string;
    formatImage?: string;
    text?: string;
  };
  comments: IComment[];
}


