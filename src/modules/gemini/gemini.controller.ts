import { responseHandler } from '@/shared/handlers/ResponseHandler'
import * as GeminiService from './gemini.service'

export const listModels = responseHandler(async ({ req }) => {
    const data = await GeminiService.listModels()
    return { data }
})

export const message = responseHandler(async ({ req }) => {
    const data = await GeminiService.message(req.body)
    return { data }
})

export const countTokens = responseHandler(async ({ req }) => {
    const data = await GeminiService.countTokens(req.body)
    return { data }
})
