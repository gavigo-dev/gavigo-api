import { responseHandler } from '@/shared/handlers/ResponseHandler'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import {
    CategoryFindByIdSchema,
    CategoryFindByNameSchema,
    CategoryAutocompleteSchema,
    CategoryUpdateSchema,
    CategoryCreateSchema,
} from './category.schema'
import * as service from './category.service'

export const create = responseHandler(async ({ req }) => {
    const category = CategoryCreateSchema.parse(req.body)
    const userId = req.user?._id
    const data = await service.createCategory(category, userId)
    return { data }
})

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const userId = req.user?._id
    const data = await service.findCategories(query, userId)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = CategoryFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    const data = await service.findById(id, userId)
    return { data }
})

export const autocomplete = responseHandler(async ({ req }) => {
    const { text } = CategoryAutocompleteSchema.parse(req.query)
    const userId = req.user?._id
    const data = await service.autocompleteCategories(text, userId)
    return { data }
})

export const findByName = responseHandler(async ({ req }) => {
    const { name } = CategoryFindByNameSchema.parse(req.params)
    const userId = req.user?._id
    const data = await service.findByName(name, userId)
    return { data }
})

export const update = responseHandler(async ({ req }) => {
    const { id } = CategoryFindByIdSchema.parse(req.params)
    const category = CategoryUpdateSchema.parse(req.body)
    const userId = req.user?._id
    await service.updateCategory(id, category, userId)
})

export const deleteCategory = responseHandler(async ({ req }) => {
    const { id } = CategoryFindByIdSchema.parse(req.params)
    const userId = req.user?._id
    await service.deleteCategory(id, userId)
})
