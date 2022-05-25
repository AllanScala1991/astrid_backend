import { NextFunction, Request, Response, Router } from "express"
import { Authentication } from "../utils/authentication"

const app  = Router()

app.use(function(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if(!authorization) return res.send({status: false, message: "Usuário não autorizado."})

    const token = authorization.split(" ")

    try {
        new Authentication().verifyAuth(token[1])
        return next()

    } catch (error) {
        console.log(error)
        return res.send({status: false, message: "Sua sessão expirou, faça login novamente."})
    }
})

export default app