import { validate } from "email-validator"
import { createTransport } from "nodemailer"
import { IEmail, IEmailSendResponse } from "../../interfaces";
import "dotenv/config"

export class Email implements IEmail {

    async isValid(email: string): Promise<IEmailSendResponse> {

        try {
            const verifyEmail = await validate(email)

            if(!verifyEmail) return {status: false, message: "Email inválido."}

            return {status: true, message: "Email válido."}

        } catch (error) {   
            console.log(error)
            return {status: false, message: error}
        }
    }

    async sendEmail(from: string, to: string, subject: string, text: string): Promise<IEmailSendResponse> {
        try {
            const isValidFrom = await this.isValid(from)
            const isValidTo = await this.isValid(to)

            if(!isValidFrom.status || !isValidTo.status) return {status: false, message: "Email inválido."}

            let transporter = createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD, 
                },
            })

            await transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text
            })

            return {status: true, message: "Email enviado com sucesso."}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }
    
}