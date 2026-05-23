import { responseHandler } from '@/shared/handlers/ResponseHandler'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import {
    TransactionFindByIdSchema,
    TransactionUpdateSchema,
    TransactionCreateSchema,
} from './transaction.schema'
import * as service from './transaction.service'

export const create = responseHandler(async ({ req }) => {
    const transaction = TransactionCreateSchema.parse(req.body)
    const userId = req.user?._id
    const data = await service.createTransaction(transaction, userId)
    return { data }
})

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const userId = req.user?._id
    const data = await service.findTransactions(query, userId)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = TransactionFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    const data = await service.findById(id, userId)
    return { data }
})

export const update = responseHandler(async ({ req }) => {
    const { id } = TransactionFindByIdSchema.parse(req.params)
    const transaction = TransactionUpdateSchema.parse(req.body)
    const userId = req.user?._id
    await service.updateTransaction(id, transaction, userId)
})

export const deleteTransaction = responseHandler(async ({ req }) => {
    const { id } = TransactionFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    await service.deleteTransaction(id, userId)
})
