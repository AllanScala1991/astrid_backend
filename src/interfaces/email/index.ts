export interface IEmail {
    isValid(email: string): Promise<IEmailSendResponse>

    sendEmail(from: string, to: string, subject: string, text: string): Promise<IEmailSendResponse>
}


export interface IEmailSendResponse {
    status: boolean, 
    message: string | unknown
    statusCode: number
}
