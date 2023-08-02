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

    } catch (err) {
      console.log('Database connection error ', err)
    }
  }

  static getConnectionStatus() {
    const connectionState = mongoose.connection.readyState
    switch (connectionState) {
      case 0:
        return 'Desconectado';
      case 1:
        return 'Conectando';
      case 2:
        return 'Conectado';
      case 3:
        return 'Desconectando';
      case 4:
        return 'Desconectado';
      default:
        return 'Estado inválido';
    }
  }
}

