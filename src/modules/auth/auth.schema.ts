import { z } from 'zod'

export const AuthSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    phone: z.string().optional(),
    nickname: z.string().optional()
})

export const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const RefreshTokenSchema = z.object({
    token: z.string()
})
