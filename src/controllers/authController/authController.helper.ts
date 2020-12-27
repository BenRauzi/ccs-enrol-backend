import * as dotenv from "dotenv"
import * as bcrypt from "bcrypt"

dotenv.config()

export const hashPassword = (password: string) => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, 10, (err: Error, hashedPassword) => {
            if(err) reject(err)
            resolve(hashedPassword)
        })
    })
}

export const verifyPassword = (password: string, hash: string) => {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hash, (err: Error, isValid: boolean) => {
            if(err) reject(err)
            resolve(isValid)
        })
    })
}

export default { 
    hashPassword,
    verifyPassword,
}