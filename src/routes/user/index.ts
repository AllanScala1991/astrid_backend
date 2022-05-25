import { Request, Response, Router } from "express"
import { UserController } from "../../controllers/user"

const app = Router()
const user = new UserController()

//REGISTER NEW USER
app.post("/user/create", async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const createUser = await user.create({name, email, password})

    res.send(createUser)
})

//GET ONE USER BY ID
app.get("/user/find/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    const findUser = await user.findOneById(id)

    res.send(findUser)
})

//UPDATE USER
app.put("/user/update", async (req: Request, res: Response) => {
    const {name, email, id} = req.body

    const updateUser = await user.update({name, email, id})

    res.send(updateUser)
})

//DELETE USER
app.delete("/user/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    const deleteUser = await user.delete(id)

    res.send(deleteUser)
})

module.exports = app