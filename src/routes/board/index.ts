import { Request, Response, Router } from "express";
import { BoardController } from "../../controllers/board";
import auth from "../../middlewares/auth"

const app = Router()

app.post("/create/board", auth, async (req: Request, res: Response) => {
    const {name, userId} = req.body

    const createBoard = await new BoardController().create(name, userId)

    res.send(createBoard)
})

app.get("/find/board/:userId", auth, async (req: Request, res: Response) => {
    const userId = req.params.userId

    const findBoards = await new BoardController().findByUserID(userId)

    res.send(findBoards)
})

app.get("/find/board/name/:name/:userId", auth, async (req: Request, res: Response) => {
    const userId = req.params.userId
    const name = req.params.name

    const findBoards = await new BoardController().findByName(name, userId)

    res.send(findBoards)
})

app.put("/update/board", auth, async (req: Request, res: Response) => {
    const {boardId, name} = req.body

    const updateBoard = await new BoardController().update(boardId, name)

    res.send(updateBoard)
})

app.delete("/delete/board/:boardId", auth, async (req: Request, res: Response) => {
    const boardId = req.params.boardId

    const deleteBoard = await new BoardController().delete(boardId)

    res.send(deleteBoard)
})

module.exports = app