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