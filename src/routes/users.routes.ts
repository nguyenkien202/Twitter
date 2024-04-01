
import userController from '../controllers/user.controllers'
import express from 'express'
import { accessTokenValidator, loginValidator, refreshTokenValidator, registerValidator } from '~/middlewares/users.middlewares'
const userRouter = express.Router()
import { wrapRequestHandler } from '~/utils/handlers'
userRouter.post('/login', loginValidator, userController.loginController)

/**
 * Description: Register a new user
 * Path: /register
 * Method:POST
 * Body:{name:string,email:string,...}
 */
userRouter.post('/register', registerValidator, userController.registerController)
userRouter.post(
  '/logout',
  accessTokenValidator,
  refreshTokenValidator,
  userController.logoutController)
export default userRouter
