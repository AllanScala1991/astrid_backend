import { Request, Response, Router } from "express"
import { StageController } from "../../controllers/stage"
import auth from "../../middlewares/auth"

const app = Router()

app.post("/create/stage", auth, async (req: Request, res: Response) => {
    const {name, boardId} = req.body

    const createStage = await new StageController().create(name, boardId)

    res.send(createStage)
})

app.get("/find/stage/:boardId", auth, async (req: Request, res: Response) => {
    const boardId = req.params.boardId

    const findStages = await new StageController().findByBoardId(boardId)

    res.send(findStages)
})

app.put("/update/stage", auth, async (req: Request, res: Response) => {
    const {name, stageId} = req.body

    const updateStage = await new StageController().update(stageId, name)

    res.send(updateStage)
})

app.delete("/delete/stage/:stageId", auth, async (req: Request, res: Response) => {
    const stageId = req.params.stageId

    const deleteStage = await new StageController().delete(stageId)

    res.send(deleteStage)
})

app.delete("/delete/stage/board/:boardId", auth, async (req: Request, res: Response) => {
    const boardId = req.params.boardId

    const deleteStage = await new StageController().deleteByBoardId(boardId)

    res.send(deleteStage)
})

module.exports = app