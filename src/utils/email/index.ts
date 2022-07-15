import { validate } from "email-validator"
import { IEmail, IEmailSendResponse } from "../../interfaces";
import "dotenv/config"
import sgMail, { ClientResponse } from "@sendgrid/mail"

export class Email implements IEmail {

    async isValid(email: string): Promise<IEmailSendResponse> {

        try {
            const verifyEmail = await validate(email)

            if(!verifyEmail) return {status: false, message: "Email inválido.", statusCode: 400}

            return {status: true, message: "Email válido.", statusCode: 200}

        } catch (error) {   
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async sendEmail(to: string, subject: string, text: string): Promise<IEmailSendResponse> {
        try {
            sgMail.setApiKey(process.env.API_KEY)

            const message = {
                to: to,
                from: process.env.FROM,
                subject: subject,
                text: text
            }

            const emailResponse:[ClientResponse, {}] = await sgMail.send(message)

            if(emailResponse[0].statusCode != 202) return {status: false, message: "Erro ao enviar o email, tente novamente.", statusCode: 500}

            return {status: true, message: "Verifique sua caixa de entrada.", statusCode: 200}
            
        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }
    
}