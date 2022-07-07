export interface IUser {
    create(user: ICreateUser): Promise<IUserResponse>

    findOneById(id: string): Promise<IUserFindResponse>

    findOneByEmail(email: string): Promise<IUserFindResponse>

    update(user: {name: string, email: string, id: string}): Promise<IUserResponse>

    delete(id: string): Promise<IUserResponse>
}


export interface ICreateUser {
    name: string
    email: string
    password: string
    id?: string | undefined
}

export interface IUserResponse {
    status: boolean
    message: string | unknown
    statusCode: number
}


export interface IUserFindResponse {
    status: boolean
    data?: ICreateUser | null
    message?: string | unknown
    statusCode: number
}
