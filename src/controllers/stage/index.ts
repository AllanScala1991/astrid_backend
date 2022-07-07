import { IStage, IStageResponse } from "../../interfaces/stage";
import { Stage } from "../../services/stage";


export class StageController implements IStage {

    constructor(
        private readonly stage: IStage = new Stage()
    ){}

    async create(name: string, boardId: string): Promise<IStageResponse> {
        if(!name || !boardId) return {status: false, message: "Todos os campos devem ser preenchidos.", statusCode: 400}

        return await this.stage.create(name, boardId)
    }

    async findByBoardId(boardId: string): Promise<IStageResponse> {
        if(!boardId) return {status: false, message: "ID do board inválido.", statusCode: 400}

        return await this.stage.findByBoardId(boardId)
    }

    async update(stageId: string, name: string): Promise<IStageResponse> {
        if(!stageId || !name) return {status: false, message: "Todos os campos devem ser preenchidos.", statusCode: 400}

        return await this.stage.update(stageId, name)
    }

    async delete(stageId: string): Promise<IStageResponse> {
        if(!stageId) return {status: false, message: "ID do quadro inválido.", statusCode: 400}

        return await this.stage.delete(stageId)
    }

    async deleteByBoardId(boardId: string): Promise<IStageResponse> {
        if(!boardId) return {status: false, message: "ID do quadro inválido.", statusCode: 400}

        return await this.stage.deleteByBoardId(boardId)
    }
    
}