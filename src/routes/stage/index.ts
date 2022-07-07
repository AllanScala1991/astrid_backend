import { Request, Response, Router } from "express"
import { StageController } from "../../controllers/stage"
import auth from "../../middlewares/auth"

const app = Router()

app.post("/create/stage", auth, async (req: Request, res: Response) => {
    const {name, boardId} = req.body

    const createStage = await new StageController().create(name, boardId)

    res.send(createStage).status(createStage.statusCode)
})

app.get("/find/stage/:boardId", auth, async (req: Request, res: Response) => {
    const boardId = req.params.boardId

    const findStages = await new StageController().findByBoardId(boardId)

    res.send(findStages).status(findStages.statusCode)
})

app.put("/update/stage", auth, async (req: Request, res: Response) => {
    const {name, stageId} = req.body

    const updateStage = await new StageController().update(stageId, name)

    res.send(updateStage).status(updateStage.statusCode)
})

app.delete("/delete/stage/:stageId", auth, async (req: Request, res: Response) => {
    const stageId = req.params.stageId

    const deleteStage = await new StageController().delete(stageId)

    res.send(deleteStage).status(deleteStage.statusCode)
})

app.delete("/delete/stage/board/:boardId", auth, async (req: Request, res: Response) => {
    const boardId = req.params.boardId

    const deleteStage = await new StageController().deleteByBoardId(boardId)

    res.send(deleteStage).status(deleteStage.statusCode)
})

module.exports = app