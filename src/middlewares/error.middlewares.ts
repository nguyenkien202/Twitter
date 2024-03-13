import  HTTP_STATUS  from '~/constants/httpStatus';
import { omit } from 'lodash'
import {Request,Response,NextFunction} from 'express'
export const defaultErrorHandler = (err:any,req:Request ,res:Response,next:NextFunction)=>{
   res.status(err.status || HTTP_STATUS.INTERNAL_SEVER_ERROR).json(omit(err,['status']))
}