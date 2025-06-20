import { z } from 'zod'

export const UserCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().default('user'),
    salt: z.string(),
    name: z.string().optional(),
    phone: z.string().optional(),
    nickname: z.string().optional()
})

export const UserUpdateSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    phone: z.string().optional(),
    nickname: z.string().optional()
})
