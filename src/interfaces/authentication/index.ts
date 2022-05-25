import { JwtPayload } from "jsonwebtoken"

export interface IAuthentication {
    generateAuth(name: string, email: string, id: string): any

    verifyAuth(token: string): string | JwtPayload
}