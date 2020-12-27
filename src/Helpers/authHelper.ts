import * as express from 'express'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import * as bcrypt from "bcrypt"

import User from "../models/User"

dotenv.config()

const jwtSecret: string = process.env.JWT_SECRET

export const jwtSign = (user: User) => {
    return jwt.sign(user, jwtSecret)
}

export const jwtVerify = (token: string) => {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err: jwt.JsonWebTokenError, data: User) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

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

export const checkToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user: User = await jwtVerify(req.cookies.authcookie)
        req.user = user
        next()
    } catch {
        res.clearCookie("authcookie")
        res.sendStatus(403)
    }
}

export default { 
    jwtSign,
    jwtVerify,
    hashPassword,
    verifyPassword,
    checkToken
}