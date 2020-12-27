import * as express from 'express'
import { checkToken } from '../Helpers/authHelper'
import User from '../models/User'
import SqlService from '../services/sqlService'

class UserController {
    public path = '/user';
    public router = express.Router();
    sql: SqlService;

    constructor(sqlService: SqlService) {
        this.sql = sqlService

        this.intializeRoutes()
    }

    public intializeRoutes(): void {
        this.router.get(`${this.path}/all`, checkToken, this.getUsers)
        this.router.get(`${this.path}`, checkToken, async (req: express.Request, res: express.Response) => {
            if(req.query.id) return this.getUserById(req, res)
            if(req.query.username) return this.getUserByUsername(req, res)
            return res.sendStatus(404)
        })
    }

    getUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        try {
            const users: Array<User> = await this.sql.query("SELECT * FROM users")

            return res.send(users.map(user => ({...user, password: undefined})))
        } catch {
            return res.sendStatus(500)
        }
    }

    getUserById = async (req: express.Request, res: express.Response): Promise<express.Response>  => {
        const id = req.query.id
        try {
            const users: Array<User> = await this.sql.query(`SELECT * FROM users WHERE id = ?`, [
                id
            ])

            if(users.length === 0) return res.sendStatus(404)

            const user = users[0]
            
            user.password = undefined

            res.send(user)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }

    getUserByUsername = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const username = req.query.username
        try {
            const users: Array<User> = await this.sql.query(`SELECT * FROM users WHERE username = ?`, [
                username
            ])

            if(users.length === 0) return res.sendStatus(404)

            const user = users[0]
            
            user.password = undefined

            res.send(user)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}

export default UserController