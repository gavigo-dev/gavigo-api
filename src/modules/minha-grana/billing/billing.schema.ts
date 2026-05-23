import { z } from 'zod'

const BillingBillItemSchema = z.object({
    categoryId: z.string(),
    expectedAmount: z.string()
})

export const BillingCreateSchema = z.object({
    bill: z.array(BillingBillItemSchema),
    name: z.string(),
    icon: z.string().optional(),
    description: z.string().optional()
})

export const BillingUpdateSchema = z.object({
    bill: z.array(BillingBillItemSchema).optional(),
    name: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional()
})

export const BillingFindByIdSchema = z.object({
    id: z.string()
})
