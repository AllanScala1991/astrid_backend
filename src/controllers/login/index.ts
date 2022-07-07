import { ILogin, ILoginResponse } from "../../interfaces";
import { Login } from "../../services/login";


export class LoginController implements ILogin {
    constructor(
        private readonly loginService: ILogin = new Login()
    ){}

    async login(email: string, password: string): Promise<ILoginResponse> {
        if(!email || !password) return {status: false, message: "O email e a senha são obrigatórios.", statusCode: 400}

        return await this.loginService.login(email, password)
    }
}