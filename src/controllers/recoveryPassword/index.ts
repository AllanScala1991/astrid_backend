import { IEmailSendResponse, IRecoveryPassword } from "../../interfaces";
import { RecoveryPassword } from "../../services/recoveryPassword";
import { User } from "../../services/user";
import "dotenv/config"


export class RecoveryPasswordController{

    constructor(
        private readonly recovery: RecoveryPassword = new RecoveryPassword(),
        private readonly user: User = new User()
    ){}

    async sendPassword(to: string): Promise<IEmailSendResponse> {
        if(!to) {
            return {status: false, message: "Todos os campos devem ser preenchidos.", statusCode: 400}
        }

        const emailExists = await this.user.findOneByEmail(to)

        if(!emailExists.status) return {status: false, message: emailExists.message, statusCode: emailExists.statusCode}

        return await this.recovery.sendPassword(process.env.FROM, to, "Recuperaçao de Senha", "Sua senha provisória é ...")
    }
    
}