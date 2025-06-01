import express from 'express'
import * as controller from '../controllers/movies.controller.mjs'

const router = express.Router()

router.get('/', controller.findAll)

router.get('/autocomplete', controller.autocomplete)

router.post('/guess', controller.guessMovie)

router.get('/movieOfDay', controller.movieOfDay)

router.get('/yesterday', controller.yesterdayMovie)

router.get('/timeRemaining', controller.timeRemaining)

export default router
