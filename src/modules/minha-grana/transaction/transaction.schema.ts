import { z } from 'zod'

const transactionTypeEnum = z.enum(['income', 'expense'])
const paymentMethodEnum = z.enum(['credit', 'pix', 'cash'])

export const TransactionCreateSchema = z.object({
    type: transactionTypeEnum,
    name: z.string(),
    amount: z.number(),
    date: z.string(),
    paymentMethod: paymentMethodEnum,
    dueDate: z.string(),
    categoryId: z.string()
})

export const TransactionUpdateSchema = z.object({
    type: transactionTypeEnum.optional(),
    name: z.string().optional(),
    amount: z.number().optional(),
    date: z.string().optional(),
    paymentMethod: paymentMethodEnum.optional(),
    dueDate: z.string().optional(),
    categoryId: z.string().optional()
})

export const TransactionFindByIdSchema = z.object({
    id: z.string()
})
