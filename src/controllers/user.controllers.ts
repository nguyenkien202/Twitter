import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { RegisterReqBody } from '~/models/schema/User.schema'
import User from '~/models/database/User'
import usersService from '~/services/users.services'
import ResponseUtils from '~/utils/ResponseUtils'
import USERS_MESSAGES from '~/constants/message'


class UserController {
  response: any
  constructor() {
    this.response = ResponseUtils
  }
  async loginController(req: Request, res: Response) {
    try{
      const user = req.user as User
      console.log('user',user)
      const user_id = user._id as ObjectId
      console.log('user_id',user_id)
      const result = await usersService.login(user_id.toString())
      console.log('result',result)
      return res.status(200).json({
        status:'Success',
        data:result
      }
      )
    }catch(error){
      return res.status(400).json({
        status:'Fail',
        data:'UnSuccess'
      }
      )
    }
  }
  async registerController(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
    try {
      const result = await usersService.register(req.body)
      return res.status(200).json({
        mes: 'Register Success',
        data: result
      })
    } catch (error) {
      return res.status(400).json({
        mes: 'Register Failed',
        error
      })
    }
  }
}
export default new UserController()