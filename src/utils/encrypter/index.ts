import { IEncrypter } from "../../interfaces";
import { hash, compare } from "bcryptjs"


export class Encrypter implements IEncrypter {

    async hash(value: string, salt: number): Promise<string> {
        return await hash(value, salt)
    }

    async compare(currentValue: string, hashValue: string): Promise<boolean> {
        return await compare(currentValue, hashValue)
    }
    
}