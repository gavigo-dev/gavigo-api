import { z } from 'zod'

export const UserCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'moderator', 'admin']).default('user'),
    salt: z.string(),
    name: z.string().optional(),
    phone: z.string().optional(),
    nickname: z.string().optional()
})

export const UserUpdateSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    nickname: z.string().optional()
})

export const UserFindByIdSchema = z.object({
    id: z.string()
})

export const UserFindByEmailSchema = z.object({
    email: z.string()
})
