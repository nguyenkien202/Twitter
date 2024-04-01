import {Request} from 'express'
import User from './models/database/User'
import { TokenPayload } from './models/schema/User.schema'

declare module 'express'{
    interface Request {
        user?:User 
        decode_authrization?:TokenPayload
        decode_refresh_token?:TokenPayload
    }
}