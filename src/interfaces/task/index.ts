export interface ITask {
    create(task: IRegisterTask): Promise<ITaskResponse>
    findByStageId(stageId: string): Promise<ITaskResponse>
    findByTaskId(taskId: string): Promise<ITaskResponse>
    update(name: string, description: string, urgency: string, currentStage: string, taskId: string): Promise<ITaskResponse>
    delete(taskId: string): Promise<ITaskResponse>
    deleteByStageId(stageId: string): Promise<ITaskResponse>
}

export interface IRegisterTask {
    name: string
    description?: string
    urgency?: string  
    currentStage?: string
    stageId: string 
}

export interface ITaskResponse {
    status: boolean
    message?: string
    data?: {}
    statusCode: number
}