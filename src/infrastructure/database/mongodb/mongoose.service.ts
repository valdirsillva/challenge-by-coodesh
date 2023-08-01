import * as dotenv from 'dotenv'
dotenv.config()
const mongoose = require("mongoose")

export class Database {
  static async _connect() {
    try {
      await mongoose.connect(process.env.DATABASE_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
      })
      
      console.log('Database connect success')
    } catch (err) {
      console.log('Database connection error ', err)
    }
  }
}

