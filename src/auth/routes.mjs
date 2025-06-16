import express from 'express'
import controller from './controllers/user.controller.mjs'
import { requireAuth } from './index.mjs'

const router = express.Router()

router.get('/authenticate', requireAuth, controller.authenticate)

router.post('/signup', controller.signup)

router.post('/login', controller.login)

export default router
