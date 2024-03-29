
import { MongoClient,Db, Collection } from 'mongodb'
import {config}  from 'dotenv'
import User from '~/models/database/User';
import RefreshToken from '~/models/database/RefreshToken';
config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wvl8mte.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
class DatabaseService {
  private client: MongoClient
  private db:Db
  constructor(){
     this.client = new MongoClient(uri)
     this.db = this.client.db(process.env.DB_NAME)
    }
     async connect() {
      try {
        // Send a ping to confirm a successful connection
        await this.db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(error){
        throw error
      }
    }
    get users():Collection<User>{
      return this.db.collection(process.env.DB_USER_COLLECTION as string)
    }
    get refreshTokens():Collection<RefreshToken>{
      return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string )
    }
  }

const databaseService = new DatabaseService()
export default databaseService
