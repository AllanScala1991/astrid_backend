import { IAuthentication, IEncrypter, ILogin, ILoginResponse, IUser } from "../../interfaces";
import { Encrypter } from "../../utils/encrypter";
import { Authentication } from "../../utils/authentication";
import { User } from "../user";


export class Login implements ILogin {

    constructor(
        private readonly user: IUser = new User(),
        private readonly encrypter: IEncrypter = new Encrypter(),
        private readonly authentication: IAuthentication = new Authentication()
    ){}

    async login(email: string, password: string): Promise<ILoginResponse> {
        try {
            const userExists = await this.user.findOneByEmail(email)

            if(!userExists.status) return userExists
            
            if(userExists.data) {
                const loginIsValid = await this.encrypter.compare(password, userExists.data.password)

                if(!loginIsValid) return {status: false, message: "Usuário ou Senha incorretos."}
                
                const token = this.authentication.generateAuth(userExists.data.name, userExists.data.email, userExists.data.id as string) 
                
                return {status: true, token: token}
            }

            return {status: false, message: "Usuário e ou Senha incorretos."}

        } catch (error) {

            return {status: false, message: error}
        }
    }
    
}