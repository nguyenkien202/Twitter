import { UserVerifyStatus } from './../../constants/enum';
import {ObjectId} from 'mongodb'
interface UserTypes{
    _id?:ObjectId
    name:String
    email:String
    date_of_birth:Date
    password:String
    created_at?:Date
    update_at?:Date
    email_verify_token?:String
    forgot_password_token?:String
    verify?:UserVerifyStatus


    bio?:String
    location?:String
    website?:String
    username?:String
    avatar?:String
    cover_photo?:String
}
export default class User{
    _id?:ObjectId
    name:String
    email:String
    date_of_birth:Date
    password:String
    created_at:Date
    update_at:Date
    email_verify_token:String
    forgot_password_token:String
    verify:UserVerifyStatus


    bio:String
    location:String
    website:String
    username:String
    avatar:String
    cover_photo:String
    
    constructor(user:UserTypes){
        this._id = user._id || new ObjectId()
        this.name = user.name || ''
        this.email = user.email
        this.date_of_birth = user.date_of_birth || new Date()
        this.password = user.password
        this.created_at = user.created_at || new Date()
        this.update_at = user.update_at   || new Date()
        this.email_verify_token = user.email_verify_token || ''
        this.forgot_password_token = user.forgot_password_token || ''
        this.verify = user.verify || UserVerifyStatus.Univerified
        this.bio = user.bio || ''
        this.location = user.location || ''
        this.website = user.website || ''
        this.username = user.username || ''
        this.avatar = user.avatar || ''
        this.cover_photo = user.cover_photo || ''
    }
}