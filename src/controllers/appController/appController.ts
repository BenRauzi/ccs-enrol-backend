import * as express from 'express'
import * as multer from "multer"
import { checkToken } from '../../Helpers/jwtHelper'
import Application from '../../models/Application'
import SqlService from '../../services/sqlService'
import { v4 as uuid } from 'uuid'
import ApplicationSummary from '../../models/ApplicationSummary'

import * as mongodb from 'mongodb'

interface Document {
    _id: mongodb.ObjectID;
    type: string;
    name: string;
    userid: string;
    applicationid: string;
    file: string;
}

class UserController {
    public path = '/app';
    public router = express.Router();
    sql: SqlService;
    uploads: multer.Multer

    constructor(sqlService: SqlService) {
        this.sql = sqlService
        this.intializeRoutes()
    }

    public intializeRoutes(): void {
        this.router.get(`${this.path}`, checkToken, this.getApplicationById)
        this.router.get(`${this.path}/all`, checkToken, this.getAllApplications)
        this.router.get(`${this.path}/active`, checkToken, this.getActiveApplications)
        this.router.get(`${this.path}/user`, checkToken, this.getUserApplications)

        this.router.post(`${this.path}/create`, checkToken, this.createApp)
        this.router.post(`${this.path}/update`, checkToken, this.updateApp)

        this.router.post(`${this.path}/update`, checkToken, this.updateApp)

        this.router.post(`${this.path}/documents/upload`, checkToken, this.uploadFile)
        this.router.get(`${this.path}/documents/get-single`, checkToken, this.getFile)
        this.router.get(`${this.path}/documents`, checkToken, this.getFile)
    }

    uploadFile = (req: express.Request, res: express.Response): express.Response => {
        const newFile: Document = { 
            _id: new mongodb.ObjectID(), 
            type: req.file.mimetype, 
            userid: req.user.id, 
            applicationid: req.body.applicationId, 
            name: req.file.originalname, 
            file: req.body.file
        }

        this.sql.insertOne("documents", newFile)
        return res.sendStatus(200)
    }

    getFile = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const file: Document = await this.sql.findOne("documents", { userid: req.user, name: req.body.name })
        return res.send({ file })
    }

    getApplicationFiles = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const files: Array<Document> = await this.sql.findMany("documents", { applicationid: req.body.applicationid })
        return res.send({ files })
    }

    getUserApplications = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const { id } = req.user

        try {
            const applications: Array<ApplicationSummary> = await this.sql.findMany("applications", { userid: id })
            return res.send(applications.map(({id, child}) => ({id, child}))) 
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
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

    updateApp = async (req: express.Request, res: express.Response): Promise<express.Response> => {
        const application: Application = req.body

        try {
            const result = await this.sql.update("applications", { id: application.id, userid: req.user.id }, application)
            if(!result) 'Update Failed'
            return res.sendStatus(200)
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

    getActiveApplications = async(req: express.Request, res: express.Response): Promise<express.Response> => {
        try {
            const applications: Array<Application> = await this.sql.findMany("applications", { status: 1})
            return res.send(applications)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
}

export default UserController