import { registerValidator,loginValidator  } from './../middlewares/users.middlewares';
import userController from '../controllers/user.controllers'; 
import express from 'express'
const userRouter = express.Router()
import { defaultErrorHandler } from '~/middlewares/error.middlewares';
userRouter.post('/login',loginValidator,userController.loginController)

/**
 * Description: Register a new user
 * Path: /register
 * Method:POST
 * Body:{name:string,email:string,...}
 */
userRouter.post('/register',registerValidator,userController.registerController)

export default userRouter
