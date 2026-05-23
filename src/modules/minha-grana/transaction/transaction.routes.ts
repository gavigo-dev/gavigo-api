import express from 'express'
import * as controller from './transaction.controller'
import { requireAuth } from '@/shared/middlewares/auth.middleware'

const router = express.Router()

router.get(
    '/',
    requireAuth,
    controller.find
)

router.get(
    '/findById/:id',
    requireAuth,
    controller.findById
)

router.post(
    '/create',
    requireAuth,
    controller.create
)

router.put(
    '/update/:id',
    requireAuth,
    controller.update
)

router.delete(
    '/delete/:id',
    requireAuth,
    controller.deleteTransaction
)

export default router
