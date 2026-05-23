import { z } from 'zod'

export const CategoryCreateSchema = z.object({
    name: z.string()
})

export const CategoryUpdateSchema = z.object({
    name: z.string().optional()
})

export const CategoryFindByIdSchema = z.object({
    id: z.string()
})

export const CategoryFindByNameSchema = z.object({
    name: z.string()
})

