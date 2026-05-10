import express from 'express'
import * as controller from './chat.controller'
import { authorizeRoles } from '@/shared/middlewares/role.middleware'
import { requireAuth } from '@/shared/middlewares/auth.middleware'

const router = express.Router()

router.get('/', requireAuth, controller.find)

router.get('/findById/:id', requireAuth, controller.findById)

router.post('/create', requireAuth, controller.create)

router.delete('/delete/:id', requireAuth, controller.deleteChat)

export default router
