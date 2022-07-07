import { IStage, IStageResponse } from "../../interfaces/stage";
import prisma from "../../utils/database"


export class Stage implements IStage {

    async create(name: string, boardId: string): Promise<IStageResponse> {
        try {
            await prisma.stages.create({
                data: {
                    name: name,
                    boardId: boardId
                }
            })

            return {status: true, message: "Quadro criado com sucesso.", statusCode: 201}

        } catch (error) {
            return {status: false, message: error, statusCode: 500}
        }
    }

    async findByBoardId(boardId: string): Promise<IStageResponse> {
        try {
            const stages = await prisma.stages.findMany({
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    boardId: boardId,
                }
            })

            return {status: true, data: stages, statusCode: 200}
            
        } catch (error) {
            return {status: false, message: error, statusCode: 500}
        }
    }

    async update(stageId: string, name: string): Promise<IStageResponse> {
        try {
            await prisma.stages.update({
                data: {
                    name: name
                },
                where: {
                    id: stageId
                }
            })

            return {status: true, message: "Quadro atualizado com sucesso.", statusCode: 200}

        } catch (error) {
            return {status: false, message: error, statusCode: 500}
        }
    }

    async delete(stageId: string): Promise<IStageResponse> {
        try {
            await prisma.stages.delete({
                where: {
                    id: stageId
                }
            })

            return {status: true, message: "Quadro deletado com sucesso.", statusCode: 200}

        } catch (error) {
            return {status: false, message: error, statusCode: 500}
        }
    }

    async deleteByBoardId(boardId: string): Promise<IStageResponse> {
        try {
            await prisma.stages.deleteMany({
                where: {
                    boardId: boardId
                }
            })

            return {status: true, message: "Quadro deletado com sucesso.", statusCode: 200}

        } catch (error) {
            return {status: false, message: error, statusCode: 500}
        }
    }
    
}