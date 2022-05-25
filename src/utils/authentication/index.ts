import { sign, verify, JwtPayload } from "jsonwebtoken";
import { IAuthentication } from "../../interfaces/authentication";
import "dotenv/config"

export class Authentication implements IAuthentication {

    generateAuth(name: string, email: string, id: string) {
        return sign({
            name: name,
            email: email,
            id: id
        }, `${process.env.SECRET_TOKEN}`, {
            expiresIn: "1d"
        })
    }
    
    verifyAuth(token: string):  string | JwtPayload {
        return verify(token, `${process.env.SECRET_TOKEN}`)
    }
    
}