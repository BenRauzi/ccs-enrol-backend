/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as dotenv from "dotenv"
import * as mongodb from 'mongodb'

dotenv.config()

class SqlService {    

    dbUrl = process.env.DB_URL
    dbSchema = process.env.DB_SCHEMA
    mongo: mongodb.MongoClient
    
    constructor() {
       this.mongo = new mongodb.MongoClient(this.dbUrl, { useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: true })
    }

    public async insertOne(collection: string, item: any): Promise<boolean> {

        try {
            const db = await this.mongo.connect()
            const dbo = db.db(this.dbSchema)

            await dbo.collection(collection).insertOne(item)
            return true
        } catch {
            return false
        }
    }

    public async findOne(collection: string, item: any): Promise<any> {
        const db = await this.mongo.connect()
        const dbo = db.db(this.dbSchema)

        const res = await dbo.collection(collection).findOne(item)
        return {...res, _id: undefined}
    }

    public async findMany(collection: string, item: any): Promise<any> {
        const db = await this.mongo.connect()
        const dbo = db.db(this.dbSchema)

        const res: Array<any> = await dbo.collection(collection).find(item).toArray()
        return res.map(item => ({...item, _id: undefined}))
    }
}

export default SqlService
