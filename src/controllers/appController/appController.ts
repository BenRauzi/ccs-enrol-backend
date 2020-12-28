import * as express from 'express'
import * as dotenv from "dotenv"

import SqlService from '../../services/sqlService'
import { v4 as uuid } from 'uuid'
import Application from '../../models/Application'
import { checkToken } from '../../Helpers/jwtHelper'

dotenv.config()

const combineChildren = (children: Array<string>) => {
    return children.join(', ')
}

class AppController {
    public path = '/app';
    public router = express.Router();
    sql: SqlService;

    constructor(sqlService: SqlService) {
        this.sql = sqlService

        this.intializeRoutes()
    }

    public intializeRoutes(): void { 
        this.router.post(`${this.path}/create`, checkToken, this.createApp)
    }

    createApp = async (req: express.Request, res: express.Response): Promise<express.Response> => {

        const application: Application = req.body
        const userId = req.user.id

        const applicationId = uuid()

        const { useOfInfo, displayOfWork, photoPublication, photoPublicationReason, confirmation } = application.privacy
        // console.log(combineChildren(application.otherChildren))

        try {
            const insertApplication = await this.sql.query(`
            INSERT INTO applications (id, user_id, other_children, use_of_info, display_of_work, photo_publication, photo_publication_reason, confirmation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                applicationId,
                userId,
                combineChildren(application.otherChildren),
                useOfInfo,
                displayOfWork, 
                photoPublication, 
                photoPublicationReason, 
                confirmation
            ])

            return res.send(req.user)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
     
    }
}

export default AppController