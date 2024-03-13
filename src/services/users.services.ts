import { TokenType } from './../constants/enum';
import { signToken } from './../utils/jwt';
import { RegisterReqBody } from './../models/User.requests';
// import { databaseService } from '~/services/database.services';

import User from "~/models/database/User";
import databaseService from "./database.services";
import { hashPassword } from '~/utils/crypto';

class UserService {
  private signAccessToken(user_id:string){
    return signToken({
      payload:{
      user_id,
      token_type:TokenType.AccessToken
    }})
  }

  private signRefreshToken(user_id:string){
    return signToken({
      payload:{
      user_id,
      token_type:TokenType.RefreshToken
    }})
  }

  async register(payload:RegisterReqBody){
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth:new Date(payload.date_of_birth),
        password:hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString()
    const [access_token,refresh_token]= await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return {
      access_token,
      refresh_token
    }
  }

 async checkEmailExist(email:string){
   const user = await databaseService.users.findOne({email})
   return Boolean(user)
 }


}

const usersService = new UserService()
export default usersService