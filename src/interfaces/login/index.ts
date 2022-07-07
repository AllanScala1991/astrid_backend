export interface ILogin {
    login(email: string, password: string): Promise<ILoginResponse>
}

export interface ILoginResponse {
    status: boolean
    message?: string | unknown
    token?: string | undefined
    statusCode: number
}