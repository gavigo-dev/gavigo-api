import { QueryOptions } from '@/shared/utils/queryParser'
import { chatRepository } from './chat.repository'
import { ChatCreate, ChatStart } from './chat.entity'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { ITEM_NOT_FOUND, OPERATION_NOT_ALLOWED } from '@/core/constants/errors'

export const findChats = async (options: QueryOptions, userId: string) => {
    const chats = await chatRepository.readAll({ userId }, options)
    return chats
}

export const findById = async (id: string, userId: string) => {
    const chat = await chatRepository.findById(id)
    const allowed = chat?.userId === userId.toString()
    if (!allowed) dispatchError(OPERATION_NOT_ALLOWED)
    return chat
}

export const createChat = async (body: ChatStart, userId: string) => {
    const config: ChatCreate = {
        userId,
        model: body.model,
        messages: [
            {
                role: 'user',
                content: body.message
            }
        ]
    }
    const chat = await chatRepository.create(config)
    return chat
}

export const deleteChat = async (id: string, userId: string) => {
    const chat = await chatRepository.findById(id)
    if (!chat) dispatchError(ITEM_NOT_FOUND)
    const allowed = chat?.userId !== userId
    if (!allowed) dispatchError(OPERATION_NOT_ALLOWED)
    await chatRepository.delete(id)
}
