import express from 'express'
import categoryRouter from './category/category.routes'
import transactionRouter from './transaction/transaction.routes'

const router = express.Router()

router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)

export default router