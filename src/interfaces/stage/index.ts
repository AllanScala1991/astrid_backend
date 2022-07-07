export interface IStage {
    create(name: string, board: string): Promise<IStageResponse>
    findByBoardId(boardId: string): Promise<IStageResponse>
    update(stageId: string, name: string): Promise<IStageResponse>
    delete(stageId: string): Promise<IStageResponse>
    deleteByBoardId(boardId: string): Promise<IStageResponse>
}

export interface IStageResponse {
    status: boolean
    message?: string
    data?: {}
    statusCode: number
}
