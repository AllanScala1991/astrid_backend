import { validate } from "email-validator"
import { createTransport } from "nodemailer"
import mg from "nodemailer-mailgun-transport"
import { IEmail, IEmailSendResponse } from "../../interfaces";
import "dotenv/config"

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

    async sendEmail(from: string, to: string, subject: string, text: string): Promise<IEmailSendResponse> {
        try {
            const isValidFrom = await this.isValid(from)
            const isValidTo = await this.isValid(to)

            if(!isValidFrom.status || !isValidTo.status) return {status: false, message: "Email inválido.", statusCode: 400}

            const auth = {
                auth: {
                  api_key: process.env.MAIL_KEY,
                  domain: process.env.DOMAIN
                }
            }

            const email = createTransport(mg(auth))

            email.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text
            }, (err, info) => {
                if (err) {
                  console.log(`Error: ${err}`);
                }
                else {
                    return {status: true, message: "Verifique sua caixa de entrada.", statusCode: 200}
                }
            });

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }
    
}