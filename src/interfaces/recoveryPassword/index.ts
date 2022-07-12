import { IEmailSendResponse } from "../email";

export interface IRecoveryPassword {
    sendPassword(from: string, to: string, subject: string, text: string): Promise<IEmailSendResponse>
}