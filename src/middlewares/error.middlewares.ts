import  HTTP_STATUS  from '~/constants/httpStatus';
import { omit } from 'lodash'
import {Request,Response,NextFunction, ErrorRequestHandler} from 'express'
import { ErrorWithStatus } from '~/models/Error';
export const defaultErrorHandler: ErrorRequestHandler = (err:any,req:Request ,res:Response,next:NextFunction)=>{
   if(err instanceof ErrorWithStatus){
    return res.status(err.status).json(omit(err,['status']))
   }
   Object.getOwnPropertyNames(err).forEach((key)=>{
     Object.defineProperty(err,key,{enumerable:true})
   })
    res.status(HTTP_STATUS.INTERNAL_SEVER_ERROR).json({
      message:err.message,
      errorInfo:err 
    })
}