import  USERS_MESSAGES  from './../constants/message';
import { ErrorWithStatus } from './../models/Error';
import { validate } from '~/utils/helpers';
import usersService  from '~/services/users.services';
import { Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto';
export const loginValidator = validate(checkSchema({
    email:{
      isEmail:{
        errorMessage:USERS_MESSAGES.INVALID_EMAIL,
      },
      trim:true,
    custom:{
      options:async (value,{req})=>{
        const user = await databaseService.users.findOne({email:value,password:hashPassword(req.body.password)})
        if(user === null){
          throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
        } 
        req.user = user
        return true
      }
    }
  },
  password:{
    notEmpty:{
      errorMessage:USERS_MESSAGES.PASSWORD_IS_REQUIRED,
    },
    isString:{
      errorMessage:USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING,
    },
    trim:true,
    // custom:{
    //   options:async (value)=>{
    //     const { isExitPassword } : any  = await databaseService.users.findOne({password:value})
    //     if(isExitPassword  == hashPassword(value)){
    //       throw new Error('Password is incorrect')
    //     }
    //     return true
    //   }
    // }
  }
})
)
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
      },
      errorMessage:USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING,
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