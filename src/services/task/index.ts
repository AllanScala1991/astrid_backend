import { IRegisterTask, ITask, ITaskResponse } from "../../interfaces/task";
import prisma from "../../utils/database"

export class Task implements ITask {

    async create(task: IRegisterTask): Promise<ITaskResponse> {
        try {
            await prisma.tasks.create({
                data: {
                    name: task.name,
                    description: task.description ? task.description : "",
                    urgency: task.urgency ? task.urgency : "",
                    currentStage: task.currentStage? task.currentStage : "",
                    stageId: task.stageId
                }
            })

            return {status: true, message: "Task criada com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async findByStageId(stageId: string): Promise<ITaskResponse> {
        try {
            const tasks = await prisma.tasks.findMany({
                where: {
                    stageId: stageId
                }
            })

            return {status: true, data: tasks}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async findByTaskId(taskId: string): Promise<ITaskResponse> {
        try {
            const tasks = await prisma.tasks.findMany({
                where: {
                    id: taskId
                }
            })

            return {status: true, data: tasks}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async update(name: string, description: string, urgency: string, currentStage: string, taskId: string): Promise<ITaskResponse> {
        try {
            await prisma.tasks.update({
                where: {
                    id: taskId
                },
                data: {
                    name: name != "" ? name : undefined,
                    description: description != "" ? description : undefined,
                    urgency: urgency != "" ? urgency : undefined,
                    currentStage: currentStage != "" ? currentStage : undefined,
                    stageId: currentStage != "" ? currentStage : undefined
                }
                
            })

            return {status: true, message: "Task atualizada com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async delete(taskId: string): Promise<ITaskResponse> {
        try {
            await prisma.tasks.delete({
                where: {
                    id: taskId
                }
            })

            return {status: true, message: "Task deletada com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async deleteByStageId(stageId: string): Promise<ITaskResponse> {
        try {
            await prisma.tasks.deleteMany({
                where: {
                    stageId: stageId
                }
            })

            return {status: true, message: "Task deletada com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }
    
}