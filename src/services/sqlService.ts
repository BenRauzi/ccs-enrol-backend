import * as mysql from "mysql"
import * as dotenv from "dotenv"
import { QueryError } from 'mysql'

dotenv.config()

class SqlService {    
    connection: mysql.Connection
    connectionConfig: mysql.ConnectionOptions = { 
        host     :  process.env.DB_HOST,
        user     :  process.env.DB_USER,
        password :  process.env.DB_PW,
        database :  process.env.DB_SCHEMA
    }

    constructor() {
        this.connection = mysql.createConnection(this.connectionConfig)

        this.connection.connect((error) => {
            if(error) console.log(error)
            console.log("Connected to MySQL Server")
        })
    }

    public query(query: string, params: Array<any> = []): Promise<Array<any>> {
        return new Promise<Array<any>>((resolve, reject) => {
            this.connection.query(query, params, (error: QueryError, result: Array<any>) => {
                if(error) reject(error)
                resolve(result)
            })
        })
    }
}

export default SqlService
