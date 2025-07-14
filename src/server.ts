import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import mainRouter from './main-router'
import { errorHandler } from './shared/handlers/ErrorHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.use(
    fileUpload({
        useTempFiles: true, // stores in tmp files (required for Drive upload)
        tempFileDir: '/tmp/', // or another custom path
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
    })
)

app.use(mainRouter)

app.use(express.static('public'))

// Global error handler (should be the LAST middleware)
app.use(errorHandler)

export const viteNodeApp = app
