import App from './app'
import AppController from './controllers/appController/appController'
import AuthController from './controllers/authController/authController'
import UserController from './controllers/userController/userController'
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
    new UserController(sqlService),
    new AppController(sqlService)
  ]
)
 
app.listen()