import express from 'express'
import * as controller from './auth.controller'
import { requireAuth } from '@/shared/middlewares/auth.middleware'

const router = express.Router()

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/refreshToken', controller.refreshToken)
router.post('/logout', requireAuth, controller.logout)

router.get('/me', requireAuth, controller.me)

export default router
