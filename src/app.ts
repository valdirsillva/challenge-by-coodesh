import * as dotenv from 'dotenv'
import express from 'express'
import { router } from './interfaces/routes/routes'
import swaggerUi from 'swagger-ui-express'
import { openAPI } from '../docs/openapi'

dotenv.config()

const app = express()

app.use(express.json())
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(openAPI))
app.use(router)

export { app }