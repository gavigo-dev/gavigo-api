import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import router from './main-router.mjs'
import { errorHandler } from './shared/handlers/ErrorHandler.mjs'

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use('/', router)

// Global error handler (should be the LAST middleware)
app.use(errorHandler)

app.listen(8888, () => {
    console.log(`Example app listening on port 8888`)
})
