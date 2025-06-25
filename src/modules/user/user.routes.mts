import express from 'express'
import * as controller from './user.controller.mjs'
import { authorizeRoles } from '../../shared/middlewares/role.middleware.mjs'
import { requireAuth } from '../../shared/middlewares/auth.middleware.mjs'

const router = express.Router()

router.get(
    '/',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.find
)

router.get(
    '/findById/:id',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.findById
)

router.get(
    '/findByEmail',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.findByEmail
)

router.put(
    '/update/:id',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.update
)

router.delete(
    '/delete/:id',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.deleteUser
)

export default router
