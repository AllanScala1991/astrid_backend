import { Request, Response, Router } from "express"
import { LoginController } from "../../controllers/login"

const app = Router()

app.post("/login", async (req: Request, res: Response) => {
    const {email, password} = req.body

    const login = await new LoginController().login(email, password)

    res.send(login).status(login.statusCode)
})


module.exports = app