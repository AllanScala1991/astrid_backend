import { generate, generateMultiple } from "generate-password"
import { IGeneratePassword } from "../../interfaces/generatePassword";

export class GeneratePassword implements IGeneratePassword {

    generate(length: number, addNumber: boolean): string{
        return generate({
                length: length,
                numbers: addNumber,
            })
    }


}