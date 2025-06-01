import express from 'express'
import controller from './controllers/user.controller.mjs'

const router = express.Router()

router.post('/signup', controller.signup)
router.post('/login', controller.login)

export default router
