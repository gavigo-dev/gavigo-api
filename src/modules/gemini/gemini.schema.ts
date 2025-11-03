import { z } from 'zod'

export const GeminiMessageSchema = z.object({
    model: z.string().optional(),
    contents: z.string(),
    config: z.any()
})

export const GeminiCountTokensSchema = z.object({
    model: z.string().optional(),
    contents: z.string()
})
