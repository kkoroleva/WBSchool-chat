export interface ISettingsList {
    id: number,
    icon: string,
    title: string,
    description: string | undefined
}
  
export interface IServerResponse {
    username: string;
    status?: string | undefined;
    avatar: string;
    email: string;
    about: string;
    userRights: string,
    _v: number;
    _id: string;
    wallpaper?: string; 
} 

export interface IProfileData {
      username?: string;
      status?: string | undefined;
      avatar?: string;
      email?: string;
      about?: string;
      wallpaper?: string; 
}