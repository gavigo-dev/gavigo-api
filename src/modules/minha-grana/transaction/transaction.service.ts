import { ITEM_NOT_FOUND, OPERATION_NOT_ALLOWED } from '@/core/constants/errors'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { QueryOptions } from '@/shared/utils/queryParser'
import {
    TransactionCreate,
    TransactionCreateBody,
    TransactionUpdate
} from './transaction.entity'
import { categoryRepository } from '../category/category.repository'
import { transactionRepository } from './transaction.repository'

const assertCategoryBelongsToUser = async (categoryId: string, userId: string) => {
    const category = await categoryRepository.findById(categoryId)
    if (!category) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (category.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    }
}

const assertTransactionOwnership = async (id: string, userId: string) => {
    const transaction = await transactionRepository.findById(id)
    if (!transaction) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (transaction.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    }
    return transaction
}

export const createTransaction = async (body: TransactionCreateBody, userId: string) => {
    await assertCategoryBelongsToUser(body.categoryId, userId)
    const config: TransactionCreate = { ...body, userId }
    const transaction = await transactionRepository.create(config)
    return transaction
}

export const findTransactions = async (options: QueryOptions, userId: string) => {
    const transactions = await transactionRepository.readAll({ userId }, options)
    return { transactions }
}

export const findById = async (id: string, userId: string) => {
    const transaction = await assertTransactionOwnership(id, userId)
    return transaction
}

export const updateTransaction = async (
    id: string,
    body: TransactionUpdate,
    userId: string
) => {
    await assertTransactionOwnership(id, userId)
    if (body.categoryId) {
        await assertCategoryBelongsToUser(body.categoryId, userId)
    }
    await transactionRepository.update(id, body)
}

export const deleteTransaction = async (id: string, userId: string) => {
    await assertTransactionOwnership(id, userId)
    await transactionRepository.delete(id)
}
