import { registerValidator } from './../middlewares/users.middlewares';
import { loginController, registerController } from './../controllers/user.controllers'
import express from 'express'
const userRouter = express.Router()
import { loginValidator } from '../middlewares/users.middlewares'
import { validate } from '~/utils/helpers';
userRouter.post('/login', loginValidator, loginController)
/**
 * Description: Register a new user
 * Path: /register
 * Method:POST
 * Body:{name:string,email:string,...}
 */
userRouter.post('/register',registerValidator, registerController)

export default userRouter
