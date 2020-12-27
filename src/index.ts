import App from './app'
import AuthController from './controllers/authController'
import UserController from './controllers/userController'
import User from './models/User'
import SqlService from './services/sqlService'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

const sqlService = new SqlService()
const app = new App(
  [
    new AuthController(sqlService),
    new UserController(sqlService)
  ]
)
 
app.listen()