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

            return {status: true, message: "Usuário criado com sucesso."}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }

    async findOneById(id: string): Promise<IUserFindResponse> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            return {status: true, data: user}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }

    async findOneByEmail(email: string): Promise<IUserFindResponse> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            return {status: true, data: user}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
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

            return {status: true, message: "Usuário atualizado com sucesso."}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }

    async delete(id: string): Promise<IUserResponse> {
        try {

            await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return {status: true, message: "Usuário deletado com sucesso."}

        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }
    
}