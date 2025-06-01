import express from 'express'
import auth from './auth/routes.mjs'

import avatarApi from './apis/avatar-api/index.mjs'
import disneyApi from './apis/disney-api/index.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Gavito API' })
})

router.use('/auth', auth)

router.use('/avatar-api', avatarApi)

router.use('/disney-api', disneyApi)

export default router
