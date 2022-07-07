import {  } from "../../interfaces/email";
import { ICreateUser, IUser, IUserFindResponse, IUserResponse, IEmail, IEncrypter } from "../../interfaces";
import { User } from "../../services/user";
import { Email } from "../../utils/email";
import { Encrypter } from "../../utils/encrypter";


export class UserController implements IUser {

    constructor(
        private readonly user: IUser = new User(),
        private readonly email: IEmail = new Email(),
        private readonly encrypter: IEncrypter = new Encrypter()
    ){}

    async create(user: ICreateUser): Promise<IUserResponse> {
        if (!user.name || !user.email || !user.password) {
            return {status: false, message: "Todos os campos devem ser preenchidos.", statusCode: 400}
        }

        const isValid = await this.email.isValid(user.email)

        if(!isValid.status) return isValid

        const emailExists = await this.user.findOneByEmail(user.email)

        if(!emailExists.status) {
            return {status: emailExists.status, message: emailExists.message, statusCode: emailExists.statusCode}
        }

        const hashPassword = await this.encrypter.hash(user.password, 8)

        user.password = hashPassword
    
        return await this.user.create(user)
    }

    async findOneById(id: string): Promise<IUserFindResponse> {
        if(!id) return {status: false, message: "ID inválido", statusCode: 400}

        return await this.user.findOneById(id)

    }

    async findOneByEmail(email: string): Promise<IUserFindResponse> {
        throw new Error("Method not implemented.");
    }

    async update(user: { name: string; email: string; id: string; }): Promise<IUserResponse> {
        if(!user.name || !user.email || !user.id) return {status: false, message: "Todos os campos devem ser preenchidos.", statusCode: 400}

        return await this.user.update(user)
    }

    async delete(id: string): Promise<IUserResponse> {
        if(!id) return {status: false, message: "ID inválido.", statusCode: 400}

        return await this.user.delete(id)
    }
    
}