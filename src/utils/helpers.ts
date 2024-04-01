import { ErrorWithStatus, EntityError } from './../models/Error';
import express from 'express';
import { body, validationResult,ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import HTTP_STATUS from '~/constants/httpStatus';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation:RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
     await validation.run(req)
    const errors = validationResult(req);
    // khong có lỗi thì next tiếp tục request
    if (errors.isEmpty()) {
      return next();
    }
    const errorsObject = errors.mapped();
    const entityError = new EntityError({errors:{}})
    for(const key in errorsObject){
     // trả về lỗi do không phải do validate
      const {msg}= errorsObject[key]
      if(msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY){
        return next(msg)
      }
      entityError.errors[key]=errorsObject[key]
    }
    next(entityError)
  };
};