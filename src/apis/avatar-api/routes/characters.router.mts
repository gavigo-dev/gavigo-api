import express from 'express'
import * as characterController from '../controllers/character.controller.mjs'

const router = express.Router()

router.get('/', characterController.findAll)

export default router
