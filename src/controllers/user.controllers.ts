import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/User.requests'
import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  res.status(200).json({
    mes: 'success',
    data: [1, 2, 3]
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
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
