import { Request, Response, Router } from "express"
import { TaskController } from "../../controllers/task";
import auth from "../../middlewares/auth"

const app = Router()

app.post("/create/task", auth, async (req: Request, res: Response) => {
    const {name, stageId, description, urgency} = req.body;

    const createTask = await new TaskController().create({name, stageId, description, urgency})

    return res.send(createTask)
})

app.get("/find/task/stage/:stageId", auth, async (req: Request, res: Response) => {
    const stageId = req.params.stageId

    const findByStageId = await new TaskController().findByStageId(stageId)

    return res.send(findByStageId)
})

app.get("/find/task/:taskId", auth, async (req: Request, res: Response) => {
    const taskId = req.params.taskId

    const findByTaskId = await new TaskController().findByTaskId(taskId)

    return res.send(findByTaskId)
})

app.put("/update/task", auth, async (req: Request, res: Response) => {
    const {name, description, urgency, taskId, currentStage} = req.body

    const updateTask = await new TaskController().update(name, description, urgency, taskId, currentStage)

    res.send(updateTask)
})

app.delete("/delete/task/:taskId", auth, async (req: Request, res: Response) => {
    const taskId = req.params.taskId

    const deleteTask = await new TaskController().delete(taskId)

    res.send(deleteTask)
})

app.delete("/delete/task/stage/:stageId", auth, async (req: Request, res: Response) => {
    const stageId = req.params.stageId

    const deleteTask = await new TaskController().deleteByStageId(stageId)

    res.send(deleteTask)
})

module.exports = app;