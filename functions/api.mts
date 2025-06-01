import express from 'express'
import cors from 'cors'
import serverless from 'serverless-http'

import router from '../src/main-router.mjs'

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use('/', router)

export const handler = serverless(app)
