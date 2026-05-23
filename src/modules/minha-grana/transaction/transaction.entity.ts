import { z } from 'zod'
import { TransactionCreateSchema, TransactionUpdateSchema } from './transaction.schema'

export type TransactionType = 'income' | 'expense'
export type PaymentMethod = 'credit' | 'pix' | 'cash'

export interface Transaction {
    _id: string
    type: TransactionType
    name: string
    amount: number
    date: string
    paymentMethod: PaymentMethod
    dueDate: string
    categoryId: string
    userId: string
    createdAt?: Date
    updatedAt?: Date
}

export interface TransactionDTO {
    _id: string
    type: TransactionType
    name: string
    amount: number
    date: string
    paymentMethod: PaymentMethod
    dueDate: string
    categoryId: string
    userId: string
    createdAt?: Date
    updatedAt?: Date
}

export interface TransactionCreateBody extends z.input<typeof TransactionCreateSchema> {}
export interface TransactionCreate extends TransactionCreateBody {
    userId: string
}
export interface TransactionUpdate extends z.input<typeof TransactionUpdateSchema> {}

export function toTransactionDTO(transaction: Transaction): TransactionDTO {
    return {
        _id: transaction._id,
        type: transaction.type,
        name: transaction.name,
        amount: transaction.amount,
        date: transaction.date,
        paymentMethod: transaction.paymentMethod,
        dueDate: transaction.dueDate,
        categoryId: transaction.categoryId,
        userId: transaction.userId,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt
    }
}
