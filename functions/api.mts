import express from 'express'
import cors from 'cors'
import serverless from 'serverless-http'

import router from '../src/main-router.mjs'
import { errorHandler } from '../src/core/handlers/ErrorHandler.mts'

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use('/', router)

// Global error handler (should be the LAST middleware)
app.use(errorHandler)

export const handler = serverless(app)
