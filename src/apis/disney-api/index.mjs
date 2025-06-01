import express from 'express'
import moviesRoutes from './routes/movies.router.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'disney-api' })
})

router.use('/movies', moviesRoutes)

export default router
