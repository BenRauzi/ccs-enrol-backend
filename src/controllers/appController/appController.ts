import * as express from 'express'
import { checkToken } from '../../Helpers/jwtHelper'
import Application from '../../models/Application'
import SqlService from '../../services/sqlService'
import { v4 as uuid } from 'uuid'

class UserController {
    public path = '/app';
    public router = express.Router();
    sql: SqlService;

    constructor(sqlService: SqlService) {
        this.sql = sqlService

        this.intializeRoutes()
    }

    public intializeRoutes(): void {
        this.router.get(`${this.path}`, checkToken, this.getApplicationById)
        this.router.get(`${this.path}/all`, checkToken, this.getAllApplications)
        this.router.post(`${this.path}/create`, checkToken, this.createApp)
    }

    createApp = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const application: Application = req.body 

        const userid = req.user.id

        const applicationId = uuid()

        const finalApplication = {
            id: applicationId,
            userid: userid,
            ...application
        }

        try {
            await this.sql.insertOne("applications", finalApplication)
            res.send({
                id: finalApplication.id
            })
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }

    getApplicationById = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const { id } = req.query
        try {
            const application: Application = await this.sql.findOne("applications", { id: id})
            if(application.id === undefined) return res.sendStatus(404)
            res.send(application)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }

    getAllApplications = async(req: express.Request, res: express.Response): Promise<express.Response> => {
        try {
            const applications: Array<Application> = await this.sql.findMany("applications", {})
            return res.send(applications)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }

}

export default UserController