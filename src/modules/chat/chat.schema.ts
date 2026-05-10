import { z } from 'zod'

const messageSchema = z.object({
    role: z.enum(['user', 'model', 'system']).default('system'),
    content: z.string()
})

export const ChatCreateSchema = z.object({
    userId: z.string(),
    title: z.string().optional(),
    model: z.string().default('gemini-2.5-flash'),
    totalTokens: z.number().optional(),
    temporary: z.boolean().optional(),
    messages: z.array(messageSchema).optional()
})

export const ChatStartSchema = z.object({
    model: z.string().default('gemini-2.5-flash'),
    message: z.string()
})

export const ChatUpdateSchema = z.object({
    title: z.string().optional(),
    totalTokens: z.number().optional(),
    temporary: z.boolean().optional(),
    messages: z.array(messageSchema).optional()
})

export const ChatFindByUserIdSchema = z.object({
    userId: z.string()
})

export const ChatFindByIdSchema = z.object({
    id: z.string()
})

export const ChatFindByName = z.object({
    title: z.string()
})
