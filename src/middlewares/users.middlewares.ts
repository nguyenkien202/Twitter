import { ErrorWithStatus } from './../models/Error';
import { validate } from '~/utils/helpers';
import usersService  from '~/services/users.services';
import { Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
export const loginValidator = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'nguyenkien66vn@gmail.com' && password === 123) {
    return res.status(200).json({
      mes: 'success'
    })
  }
  return res.status(400).json({
    error: 'Missing input error'
  })
}
export const registerValidator = validate(checkSchema({
   name:{
    trim:true,
    notEmpty:true,
    isLength:{
      options:{
        min:1,
        max:100
      }
    }
   },
   email:{
    notEmpty:true,
    isEmail:true,
    trim:true,
    custom:{
      options:async (value)=>{
        const isExitEmail = await usersService.checkEmailExist(value)
        if(isExitEmail){
          throw new Error('Email already exists')
        }  
        return true
      }
      }
    }
  ,
  password:{
    notEmpty:true,
    isString:true,
    isLength:{
      options:{
        min:6,
        max:50
      },
    },
    isStrongPassword:{
      options:{
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
      }
    }
  }
  ,
  confirm_password:{
    notEmpty:true,
    isString:true,
    isLength:{
      options:{
        min:6,
        max:50
      }
    },
    isStrongPassword:{
      options:{
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
      }
    },
    custom:{
      options:(value,{req})=>{
        if(value !== req.body.password){
          throw new Error('Password doesn not match')
        }
        return true
      }
    }
  }
  ,
  date_of_birth:{
     isISO8601:{
      options:{
        strict:true,
        strictSeparator:true,
      }
     }
  }
}))