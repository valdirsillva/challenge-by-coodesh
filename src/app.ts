import * as dotenv from 'dotenv'
import express from 'express'
import { router } from './interfaces/routes/routes'
dotenv.config()

const app = express()

app.use(express.json())
app.use(router)

export { app }