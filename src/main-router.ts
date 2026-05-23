import path from 'path'
import express from 'express'

import authRouter from './modules/auth/auth.routes'
import usersApi from './modules/user/user.routes'
import disneyApi from './modules/disneydle/movie/movie.routes'
// import avatarApi from './modules/avatar-api/index.mjs'
import geminiRouter from './modules/gemini/gemini.routes'
import minhaGranaApi from './modules/minha-grana/index.routes'

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})

router.use('/auth', authRouter)

router.use('/users-api', usersApi)

// router.use('/avatar-api', avatarApi)

router.use('/disney-api', disneyApi)

router.use('/gemini', geminiRouter)

router.use('/minha-grana-api', minhaGranaApi)

export default router
