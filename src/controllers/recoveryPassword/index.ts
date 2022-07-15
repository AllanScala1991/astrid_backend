import { IEmailSendResponse, IRecoveryPassword } from "../../interfaces";
import { RecoveryPassword } from "../../services/recoveryPassword";
import { User } from "../../services/user";
import "dotenv/config"
import { GeneratePasswordService } from "../../services/generatePassword";
import { Encrypter } from "../../utils/encrypter";


export class RecoveryPasswordController{

    constructor(
        private readonly recovery: RecoveryPassword = new RecoveryPassword(),
        private readonly user: User = new User(),
        private readonly gen = new GeneratePasswordService(),
        private readonly encrypter: Encrypter = new Encrypter()
    ){}

    async sendPassword(to: string): Promise<IEmailSendResponse> {
        if(!to) {
            return {status: false, message: "O email deve ser informado.", statusCode: 400}
        }

        const emailExists = await this.user.findOneByEmail(to)

        if(!emailExists.status) return {status: false, message: emailExists.message, statusCode: emailExists.statusCode}

        const temporaryPassword = this.gen.generate(8, true)

        const hashPassword = await this.encrypter.hash(temporaryPassword, 8)

        const saveTemporyPassword = await this.user.updatePassword(emailExists.data.id, hashPassword)

        if(!saveTemporyPassword.status) return {status: false, message: saveTemporyPassword.message, statusCode: saveTemporyPassword.statusCode}

        return await this.recovery.sendPassword(to, "Recuperaçao de Senha", `Sua senha provisória é ${temporaryPassword}`)
    }
    
}