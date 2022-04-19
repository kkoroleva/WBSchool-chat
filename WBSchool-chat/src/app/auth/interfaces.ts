export interface User {
    emailOrUser?: string
    email?: string,
    username?: string,
    password: string
}

export interface Register {
    email: string,
    username: string
}

export interface Login {
    token: string
}

export interface INewUser {
    token: string,
    newUser: IUserData
}

export interface IUserData {
        email: string,
        username: string,
        userRights: string,
        avatar: string,
        about: string,
        id: string,
        v: number
}