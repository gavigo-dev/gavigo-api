import { z } from 'zod'
import { BillingCreateSchema, BillingUpdateSchema } from './billing.schema'

export interface BillingBillItem {
    categoryId: string
    expectedAmount: string
}

export interface Billing {
    _id: string
    userId: string
    bill: BillingBillItem[]
    name: string
    icon?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface BillingDTO {
    _id: string
    userId: string
    bill: BillingBillItem[]
    name: string
    icon?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface BillingCreateBody extends z.input<typeof BillingCreateSchema> {}
export interface BillingCreate extends BillingCreateBody {
    userId: string
}
export interface BillingUpdate extends z.input<typeof BillingUpdateSchema> {}

export function toBillingDTO(billing: Billing): BillingDTO {
    return {
        _id: billing._id,
        userId: billing.userId,
        bill: billing.bill,
        name: billing.name,
        icon: billing.icon,
        description: billing.description,
        createdAt: billing.createdAt,
        updatedAt: billing.updatedAt
    }
}
