import * as express from 'express'
import * as dotenv from "dotenv"

import SqlService from '../../services/sqlService'
import { v4 as uuid } from 'uuid'
import { checkToken, jwtSign,  } from '../../Helpers/jwtHelper'
import { hashPassword, verifyPassword } from "./authController.helper"

import User from '../../models/User'

dotenv.config()

const cookieConfig: express.CookieOptions = {
    domain:  process.env.DOMAIN,
    path: '/',
    maxAge: 1000*60*60,
    httpOnly: true
}

class AuthController {
    public path = '/auth';
    public router = express.Router();
    sql: SqlService;

    constructor(sqlService: SqlService) {
        this.sql = sqlService

        this.intializeRoutes()
    }

    public intializeRoutes(): void { 
        this.router.post(`${this.path}/create`, this.createUser)
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/logout`, checkToken, this.logout)
    }

    createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const { username, password, firstName, lastName, email } = req.body
        try {
            const hashedPassword = await hashPassword(password)
            const userId: string = uuid()

            await this.sql.query("INSERT into users (id, username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?, ?)", [
                userId,
                username,
                hashedPassword,
                firstName,
                lastName,
                email
            ])

            return res.sendStatus(200)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }

    login = async(req: express.Request, res: express.Response): Promise<express.Response> => {
        const { username, password } = req.body

        try {
            const userInfo: Array<User> = await this.sql.query(`SELECT * FROM users WHERE username = ?`, [
                username
            ])
            
            if(userInfo.length === 0) return res.sendStatus(404)
            const user: User = userInfo[0]

            const passwordIsValid = await verifyPassword(password, user.password)
            if(!passwordIsValid) return res.sendStatus(401)

            user.password = undefined

            res.cookie(`authcookie`, jwtSign({...user}), cookieConfig)
            return res.send(user)

        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }

    logout = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        res.clearCookie('authcookie', cookieConfig)
        return res.sendStatus(200)
    }
}

export default AuthController