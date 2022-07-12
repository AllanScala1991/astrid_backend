import { Request, Response, Router } from "express"
import { RecoveryPasswordController } from "../../controllers/recoveryPassword"

const app = Router()
const recoveryController = new RecoveryPasswordController()

app.post("/recovery", async (req: Request, res: Response) => {
    const { to } = req.body

    const recovery = await recoveryController.sendPassword(to)

    res.send(recovery)
})

module.exports = app