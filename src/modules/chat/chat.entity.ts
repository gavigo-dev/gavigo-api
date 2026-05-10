import { z } from 'zod'
import { ChatCreateSchema, ChatUpdateSchema } from './chat.schema'

export interface MessageData {
    _id: string
    role: string
    content: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Chat {
    _id: string
    title: string
    model: string
    userId: string
    totalTokens: number
    temporary: boolean
    messages: [MessageData]
    createdAt?: Date
    updatedAt?: Date
}

export interface ChatDTO {
    _id: string
    title: string
    model: string
    userId: string
    totalTokens: number
    temporary: boolean
    messages: [MessageData]
    createdAt?: Date
    updatedAt?: Date
}

export interface ChatStart {
    message: string
    model: string
}

export interface ChatCreate extends z.input<typeof ChatCreateSchema> {}
export interface ChatUpdate extends z.input<typeof ChatUpdateSchema> {}

export function toChatDTO(chat: Chat): ChatDTO {
    return {
        _id: chat._id,
        title: chat.title,
        model: chat.model,
        userId: chat.userId,
        totalTokens: chat.totalTokens,
        temporary: chat.temporary,
        messages: chat.messages,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
    }
}
