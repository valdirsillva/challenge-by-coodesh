import * as dotenv from 'dotenv'
const mongoose = require("mongoose")
dotenv.config()

const uri = process.env.CLUSTER_DBMONGO_ATLAS

export class Database {
  static async _connect() {
    try {
      await mongoose.connect(uri, { sslValidate: true })
    } catch (err) {
      console.log('Database connection error ')
    }
  }
}

