import * as express from 'express'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

import User from "../models/User"

dotenv.config()

const jwtSecret: string = process.env.JWT_SECRET

export const jwtSign = (user: User): string => {
    return jwt.sign(user, jwtSecret)
}

export const jwtVerify = (token: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err: jwt.JsonWebTokenError, data: User) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

export const checkToken = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
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
    checkToken
}