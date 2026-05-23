import { responseHandler } from '@/shared/handlers/ResponseHandler'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import {
    BillingFindByIdSchema,
    BillingUpdateSchema,
    BillingCreateSchema,
} from './billing.schema'
import * as service from './billing.service'

export const create = responseHandler(async ({ req }) => {
    const billing = BillingCreateSchema.parse(req.body)
    const userId = req.user?._id
    const data = await service.createBilling(billing, userId)
    return { data }
})

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const userId = req.user?._id
    const data = await service.findBillings(query, userId)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = BillingFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    const data = await service.findById(id, userId)
    return { data }
})


export const update = responseHandler(async ({ req }) => {
    const { id } = BillingFindByIdSchema.parse(req.params)
    const billing = BillingUpdateSchema.parse(req.body)
    const userId = req.user?._id
    await service.updateBilling(id, billing, userId)
})

export const deleteBilling = responseHandler(async ({ req }) => {
    const { id } = BillingFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    await service.deleteBilling(id, userId)
})
