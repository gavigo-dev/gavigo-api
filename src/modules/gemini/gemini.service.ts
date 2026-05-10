import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { GeminiCountTokensSchema, GeminiMessageSchema } from './gemini.schema'
import { GoogleGenAI } from '@google/genai'
import { BAD_REQUEST } from '@/core/constants/errors'

let genAI: GoogleGenAI

const setApi = (key = 'GOOGLE_API_KEY') => {
    try {
        const apiKey = process.env[key] || ''
        genAI = new GoogleGenAI({ apiKey })
    } catch (error) {
        console.log('Failed to initialize Google GenAI client')
    }
}

export const message = async (data: unknown) => {
    try {
        if (!genAI) setApi()

        const { model, contents, config } = GeminiMessageSchema.parse(data)

        console.log(config)

        const response = await genAI.models.generateContent({
            model: model || 'gemini-2.5-flash',
            contents,
            config
        })

        return response
    } catch (error) {
        dispatchError(BAD_REQUEST)
    }
}

export const countTokens = async (data: unknown) => {
    try {
        if (!genAI) setApi()

        const { contents, model } = GeminiCountTokensSchema.parse(data)

        const response = await genAI.models.countTokens({
            model: model || 'gemini-2.5-flash',
            contents
        })

        return response
    } catch (error) {
        dispatchError(BAD_REQUEST)
    }
}

export const listModels = async () => {
    try {
        if (!genAI) setApi()

        const response = await genAI.models.list()

        const list = response.page.map((model) => {
            const split = model.name?.split('/') || []
            return split.at(-1)
        })

        return list
    } catch (error) {
        dispatchError(BAD_REQUEST)
    }
}
