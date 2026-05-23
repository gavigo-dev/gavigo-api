import { z } from 'zod'
import { CategoryCreateSchema, CategoryUpdateSchema } from './category.schema'

export interface Category {
    _id: string
    name: string
    userId: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CategoryDTO {
    _id: string
    name: string
    userId: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CategoryCreateBody extends z.input<typeof CategoryCreateSchema> {}
export interface CategoryCreate extends CategoryCreateBody {
    userId: string
}
export interface CategoryUpdate extends z.input<typeof CategoryUpdateSchema> {}

export function toCategoryDTO(category: Category): CategoryDTO {
    return {
        _id: category._id,
        name: category.name,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    }
}
