import prisma from "../../utils/database";
import { ICreateUser, IUser, IUserFindResponse, IUserResponse } from "../../interfaces";


export class User implements IUser {
    constructor(
    ){}

    async create(user: ICreateUser): Promise<IUserResponse> {
        try {
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }
            })

            return {status: true, message: "Usuário criado com sucesso.", statusCode: 201}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async findOneById(id: string): Promise<IUserFindResponse> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            return {status: true, data: user, statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async findOneByEmail(email: string): Promise<IUserFindResponse> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            return {status: true, data: user, statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }
    
    async update(user: { name: string; email: string; id: string }): Promise<IUserResponse> {
        try {
            
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: user.name,
                    email: user.email
                }
            })

            return {status: true, message: "Usuário atualizado com sucesso.", statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async updatePassword(id: string, password: string): Promise<IUserResponse> {
        try {
            await prisma.user.update({
                where: {
                    id: id                
                },
                data: {
                    password: password
                }
            })

            return {status: true, message: "Senha atualizada com sucesso.", statusCode: 200}
            
        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }

    async delete(id: string): Promise<IUserResponse> {
        try {

            await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return {status: true, message: "Usuário deletado com sucesso.", statusCode: 200}

        } catch (error) {
            console.log(error)
            return {status: false, message: error, statusCode: 500}
        }
    }
    
}