import { responseHandler } from '@/shared/handlers/ResponseHandler'
import * as service from './chat.service'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import { ChatFindByIdSchema, ChatStartSchema } from './chat.schema'

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const userId = req.user?._id

    const data = await service.findChats(query, userId)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = ChatFindByIdSchema.parse(req.params)
    const userId = req.user?._id

    const data = await service.findById(id, userId)
    return { data }
})

export const create = responseHandler(async ({ req }) => {
    const chat = ChatStartSchema.parse(req.body)
    const userId = req.user?._id

    const data = await service.createChat(chat, userId)
    return { data }
})

export const deleteChat = responseHandler(async ({ req }) => {
    const { id } = ChatFindByIdSchema.parse(req.params)
    await service.deleteChat(id, req.user?.id)
})
