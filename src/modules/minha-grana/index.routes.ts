import express from 'express'
import categoryRouter from './category/category.routes'
import transactionRouter from './transaction/transaction.routes'
import billingRouter from './billing/billing.routes'

const router = express.Router()

router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)
router.use('/billing', billingRouter)

export default router