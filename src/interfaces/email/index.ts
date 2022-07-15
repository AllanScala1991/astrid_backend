export interface IEmail {
    isValid(email: string): Promise<IEmailSendResponse>

    sendEmail(to: string, subject: string, text: string): Promise<IEmailSendResponse>
}


export interface IEmailSendResponse {
    status: boolean, 
    message: string | unknown
    statusCode: number
}
