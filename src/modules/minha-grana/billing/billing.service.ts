import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { QueryOptions } from '@/shared/utils/queryParser'
import { ITEM_NOT_FOUND, OPERATION_NOT_ALLOWED } from '@/core/constants/errors'
import { BillingCreate, BillingCreateBody, BillingUpdate } from './billing.entity'
import { billingRepository } from './billing.repository'

export const createBilling = async (body: BillingCreateBody, userId: string) => {
    const config: BillingCreate = {
        ...body,
        userId
    }
    const billing = await billingRepository.create(config)
    return billing
}

export const findBillings = async (options: QueryOptions, userId: string) => {
    const billings = await billingRepository.readAll({ userId }, options)
    return { billings }
}

export const findById = async (id: string, userId: string) => {
    const billing = await billingRepository.findById(id)
    if (!billing) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (billing.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    }
    return billing
}

export const updateBilling = async (id: string, body: BillingUpdate, userId: string) => {
    const billing = await billingRepository.findById(id)
    if (!billing) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (billing.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    } else {
        await billingRepository.update(id, body)
    }
}

export const deleteBilling = async (id: string, userId: string) => {
    const billing = await billingRepository.findById(id)
    if (!billing) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (billing.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    } else {
        await billingRepository.delete(id)
    }
}
