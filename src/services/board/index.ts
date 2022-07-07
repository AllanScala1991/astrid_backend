import prisma from "../../utils/database";
import { IBoard, IBoardResponse } from "../../interfaces/board";


export class Board implements IBoard {

    async create(name: string, userId: string): Promise<IBoardResponse> {
        try {
            await prisma.board.create({
                data: {
                    name: name,
                    userId: userId
                }
            })

            return {status: true, message: "Board criado com sucesso.", statusCode: 201}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async findByUserID(userId: string): Promise<IBoardResponse> {
        try {
            const data = await prisma.board.findMany({
                where: {
                    userId: userId
                }
            })

            return {status: true, data: data, statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async findByName(name: string, userId: string): Promise<IBoardResponse> {
        try {
            const data = await prisma.board.findMany({
                where: {
                    userId: userId,
                    name: {
                        contains: name
                    }
                }
            })

            return {status: true, data: data, statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async update(boardId: string, name: string): Promise<IBoardResponse> {
        try {
            await prisma.board.update({
                where: {
                    id: boardId
                },
                data: {
                    name: name
                }
            })

            return {status: true, message: "Board atualizado com sucesso.", statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async delete(boardId: string): Promise<IBoardResponse> {
        try {
            await prisma.board.delete({
                where: {
                    id: boardId
                }
            })

            return {status: true, message: "Board deletado com sucesso.", statusCode: 200}
        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }
    
}