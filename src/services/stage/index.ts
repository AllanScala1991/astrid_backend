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

            return {status: true, message: "Stage criado com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async findByBoardId(boardId: string): Promise<IStageResponse> {
        try {
            const stages = await prisma.stages.findMany({
                where: {
                    boardId: boardId
                }
            })

            return {status: true, data: stages}
            
        } catch (error) {
            return {status: false, message: error}
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

            return {status: true, message: "Stage atualizado com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async delete(stageId: string): Promise<IStageResponse> {
        try {
            await prisma.stages.delete({
                where: {
                    id: stageId
                }
            })

            return {status: true, message: "Stage deletado com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }

    async deleteByBoardId(boardId: string): Promise<IStageResponse> {
        try {
            await prisma.stages.deleteMany({
                where: {
                    boardId: boardId
                }
            })

            return {status: true, message: "Stage deletado com sucesso."}

        } catch (error) {
            return {status: false, message: error}
        }
    }
    
}