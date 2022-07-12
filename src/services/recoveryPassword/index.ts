import { IEmailSendResponse, IRecoveryPassword } from "../../interfaces";
import { Email } from "../../utils/email";


export class RecoveryPassword implements IRecoveryPassword {
    constructor(
        private readonly email: Email = new Email()
    ){}

    async sendPassword(from: string, to: string, subject: string, text: string): Promise<IEmailSendResponse> {
        return await this.email.sendEmail(from, to, subject, text)
    }
    
}