import express from 'express'
import * as controller from './movie.controller'
import { authorizeRoles } from '@/shared/middlewares/role.middleware'
import { requireAuth } from '@/shared/middlewares/auth.middleware'
import { requireLang } from '@/shared/middlewares/lang.middleware'

const router = express.Router()

router.get('/', requireLang, controller.find)

router.get('/findById/:id', requireLang, controller.findById)

router.post(
    '/create',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.create
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
    controller.deleteMovie
)

router.get('/autocomplete', requireLang, controller.autocomplete)

router.get('/movieOfDay', requireLang, controller.movieOfDay)

router.get('/timeRemaining', requireLang, controller.timeRemaining)

router.post('/guess', requireLang, controller.guessMovie)

router.post(
    '/uploadImage/:id',
    requireAuth,
    authorizeRoles('admin', 'moderator'),
    controller.uploadImage
)

export default router
