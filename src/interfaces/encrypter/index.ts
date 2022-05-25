export interface IEncrypter {
    hash(value: string, salt: number): Promise<string>

    compare(currentValue: string, hashValue: string): Promise<boolean>
}