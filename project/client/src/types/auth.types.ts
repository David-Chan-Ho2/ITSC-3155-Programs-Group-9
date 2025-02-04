export interface IAuth {
    email: string
    password: string
}

export interface IRegister extends IAuth {
    password2: string
}

export interface IToken {
    token: string
}