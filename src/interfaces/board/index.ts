export interface IBoard {
    create (name: string, userId: string): Promise<IBoardResponse>

    findByUserID(userId: string): Promise<IBoardResponse>

    findByName(name: string, userId: string): Promise<IBoardResponse>

    update(boardId: string, name: string): Promise<IBoardResponse>

    delete(boardId: string): Promise<IBoardResponse>
}

export interface IBoardResponse {
    status: boolean,
    message?: string | unknown
    data?: {} | undefined
}