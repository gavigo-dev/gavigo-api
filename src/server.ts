import express from 'express'
import cors from 'cors'
import mainRouter from './main-router'
import { errorHandler } from './shared/handlers/ErrorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(mainRouter)

app.use(express.static('public'))

// Global error handler (should be the LAST middleware)
app.use(errorHandler)

export const viteNodeApp = app
