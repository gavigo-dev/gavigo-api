import express from 'express'
import * as controller from './gemini.controller'

const router = express.Router()

router.post('/message', controller.message)
router.post('/countTokens', controller.countTokens)

export default router
