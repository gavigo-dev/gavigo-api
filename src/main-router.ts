import express from 'express'

import authRouter from './modules/auth/auth.routes'
import usersApi from './modules/user/user.routes'
// import avatarApi from './modules/avatar-api/index.mjs'
// import disneyApi from './modules/disney-api/index.mjs'

const router = express.Router()

router.get('/', (_req, res) => {
    res.json({ message: 'Gavito API' })
})

router.use('/auth', authRouter)

router.use('/users-api', usersApi)

// router.use('/avatar-api', avatarApi)

// router.use('/disney-api', disneyApi)

export default router
