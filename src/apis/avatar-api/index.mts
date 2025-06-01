import express from 'express'
import charactersRoutes from './routes/characters.router.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'avatar-api' })
})

router.use('/characters', charactersRoutes)

export default router
