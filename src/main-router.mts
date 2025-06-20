import express from 'express'

import authRouter from './apis/users-api/auth/auth.routes.mjs'
import usersApi from './apis/users-api/user/user.routes.mjs'
// import avatarApi from './apis/avatar-api/index.mjs'
// import disneyApi from './apis/disney-api/index.mjs'

const router = express.Router()

router.get('/', (_req, res) => {
    res.json({ message: 'Gavito API' })
})

router.use('/auth', authRouter)

router.use('/users-api', usersApi)

// router.use('/avatar-api', avatarApi)

// router.use('/disney-api', disneyApi)

export default router
