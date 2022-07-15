import { IGeneratePassword } from "../../interfaces/generatePassword";
import { GeneratePassword } from "../../utils/generatePassword";


export class GeneratePasswordService implements IGeneratePassword {

    constructor(
        private readonly gen: GeneratePassword = new GeneratePassword()
    ){}

    generate(length: number, addNumber: boolean): string{
        return this.gen.generate(length, addNumber)
    }
    
}