import { IRegisterTask, ITask, ITaskResponse } from "../../interfaces/task";
import { Task } from "../../services/task";


export class TaskController implements ITask {
    constructor(
        private readonly task: ITask = new Task()
    ){}

    async create(task: IRegisterTask): Promise<ITaskResponse> {
        if(!task.name || !task.stageId) return {status: false, message: "Campos obrigatórios devem ser preenchidos."}

        if(!task.description) task.description = ""

        if(!task.urgency) task.urgency = "low"

        if(!task.currentStage) task.currentStage = ""
        
        return await this.task.create(task)
    }

    async findByStageId(stageId: string): Promise<ITaskResponse> {
        if(!stageId) return {status: false, message: "ID do quadro inválido."}

        return await this.task.findByStageId(stageId)
    }

    async findByTaskId(taskId: string): Promise<ITaskResponse> {
        if(!taskId) return {status: false, message: "ID da tarefa inválido."}

        return await this.task.findByTaskId(taskId)
    }

    async update(name: string, description: string, urgency: string, taskId: string, currentStage: string): Promise<ITaskResponse> {
        return await this.task.update(name, description, urgency, currentStage, taskId)
    }

    async delete(taskId: string): Promise<ITaskResponse> {
        if(!taskId) return {status: false, message: "ID da tarefa inválido."}

        return await this.task.delete(taskId)
    }

    async deleteByStageId(stageId: string): Promise<ITaskResponse> {
        if(!stageId) return {status: false, message: "ID do quadro inválido."}

        return await this.task.deleteByStageId(stageId)
    }
    
}