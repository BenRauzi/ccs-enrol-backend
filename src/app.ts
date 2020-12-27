import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<any>) {
    this.app = express()
    this.port = parseInt(process.env.PORT) || 5000
 
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({extended:true}))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())

    this.app.use(cors({
      origin: process.env.ORIGIN || "http://localhost:3000",
      credentials: true
    }))
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }
 
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }
}
 
export default App