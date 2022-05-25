import { IBoard, IBoardResponse } from "../../interfaces/board";
import { Board } from "../../services/board";


export class BoardController implements IBoard {

    constructor(
        private readonly board: IBoard = new Board()
    ){}

    async create(name: string, userId: string): Promise<IBoardResponse> {
        if(!name || !userId) return {status: false, message: "Todos os campos devem ser preenchidos."}

        return await this.board.create(name, userId)
    }

    async findByUserID(userId: string): Promise<IBoardResponse> {
        if(!userId) return {status: false, message: "Todos os campos devem ser preenchidos."}

        return await this.board.findByUserID(userId)
    }

    async findByName(name: string, userId: string): Promise<IBoardResponse> {
        if(!userId || !name) return {status: false, message: "Todos os campos devem ser preenchidos."}

        if(name == "all") return await this.board.findByUserID(userId)

        return await this.board.findByName(name, userId)
    }

    async update(boardId: string, name: string): Promise<IBoardResponse> {
        if(!boardId || !name) return {status: false, message: "Todos os campos devem ser preenchidos."}

        return await this.board.update(boardId, name)
    }

    async delete(boardId: string): Promise<IBoardResponse> {
        if(!boardId) return {status: false, message: "Todos os campos devem ser preenchidos."}

        return await this.board.delete(boardId)
    }

}