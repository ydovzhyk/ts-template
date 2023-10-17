export interface IUserDataRegister {
    username: string,
    email: string,
    password: string,
    userAvatar: string
}

export interface IUserDataLogin {
    email: string,
    password: string,
}