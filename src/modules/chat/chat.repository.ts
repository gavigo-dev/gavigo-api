import { BaseRepository } from '@/core/repositories/base.repository'
import ChatModel from './chat.model'
import { toChatDTO, ChatCreate, ChatDTO, ChatUpdate } from './chat.entity'

class ChatRepository extends BaseRepository<
    (typeof ChatModel)['prototype'],
    ChatDTO,
    ChatCreate,
    ChatUpdate
> {
    constructor() {
        super(ChatModel, toChatDTO)
    }
}

export const chatRepository = new ChatRepository()
