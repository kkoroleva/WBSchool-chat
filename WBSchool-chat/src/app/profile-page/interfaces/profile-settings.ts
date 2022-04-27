export interface ISettingsList {
    id: number,
    type: string,
    icon: string,
    title: string,
    description?: string
}
  
export interface IServerResponse {
    about: string;
    avatar: string;
    email: string;
    formatImage: string; 
    userRights: string;
    username: string;
    __v: number;
    _id: string;
    status?: string | undefined;
    wallpaper?: string; 
} 

export interface IProfileData {
      username?: string;
      status?: string | undefined;
      avatar?: string;
      email?: string;
      about?: string;
      wallpaper?: string; 
      formatImage?: string;
}