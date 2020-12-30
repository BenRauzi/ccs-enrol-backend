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
        this.mongo.connect()
    }

    public async insertOne(collection: string, item: any): Promise<boolean> {

        try {
            const dbo = this.mongo.db(this.dbSchema)

            await dbo.collection(collection).insertOne(item)
            return true
        } catch {
            return false
        }
    }

    public async findOne(collection: string, query: any): Promise<any> {
        const dbo = this.mongo.db(this.dbSchema)

        const res: any = await dbo.collection(collection).findOne(query)
        return {...res, _id: undefined}
    }
    
    public async findMany(collection: string, query: any): Promise<any> {
        const dbo = this.mongo.db(this.dbSchema)
        
        const res: Array<any> = await dbo.collection(collection).find(query).toArray()
        return res.map(item => ({...item, _id: undefined}))
    }

    public update = async (collection: string, query: any, item: any): Promise<boolean> => {
        try {
            const dbo = this.mongo.db(this.dbSchema)
    
            await dbo.collection(collection).updateOne(query, { $set: item})
            return true
        } catch {
            return false
        }
    }
}

export default SqlService
