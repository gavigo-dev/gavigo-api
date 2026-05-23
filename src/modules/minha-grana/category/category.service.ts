import { ITEM_NOT_FOUND, OPERATION_NOT_ALLOWED } from '@/core/constants/errors'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { QueryOptions } from '@/shared/utils/queryParser'
import { CategoryCreate, CategoryCreateBody, CategoryUpdate } from './category.entity'
import { categoryRepository } from './category.repository'

export const createCategory = async (body: CategoryCreateBody, userId: string) => {
    const config: CategoryCreate = {
        ...body,
        userId
    }
    const category = await categoryRepository.create(config)
    return category
}

export const findCategories = async (options: QueryOptions, userId: string) => {
    const categories = await categoryRepository.readAll({ userId }, options)
    return { categories }
}

export const findById = async (id: string, userId: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (category.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    }
    return category
}

export const findByName = async (name: string, userId: string) => {
    const category = await categoryRepository.findByName(name, userId)
    if (!category) dispatchError(ITEM_NOT_FOUND)
    const allowed = category.userId === userId.toString()
    if (!allowed) dispatchError(OPERATION_NOT_ALLOWED)
    return category
}

export const updateCategory = async (id: string, body: CategoryUpdate, userId: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (category.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    } else {
        await categoryRepository.update(id, body)
    }
}

export const autocompleteCategories = async (text: string, userId: string) => {
    if (!text) return []
    const categories = await categoryRepository.autocomplete(text, userId)
    return categories
}

export const deleteCategory = async (id: string, userId: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        dispatchError(ITEM_NOT_FOUND)
    } else if (category.userId !== userId.toString()) {
        dispatchError(OPERATION_NOT_ALLOWED)
    } else {
        await categoryRepository.delete(id)
    }
}
