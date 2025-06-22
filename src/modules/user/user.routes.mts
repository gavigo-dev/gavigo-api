import express from 'express'
import * as controller from './user.controller.mjs'
import { authorizeRoles } from '../../shared/middlewares/role.middleware.mjs'
import { requireAuth } from '../../shared/middlewares/auth.middleware.mjs'

const router = express.Router()

router.get('/', requireAuth, authorizeRoles('admin'), controller.find)

export default router
