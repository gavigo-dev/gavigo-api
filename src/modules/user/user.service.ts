import { OPERATION_NOT_ALLOWED } from '@/core/constants/errors'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { QueryOptions } from '@/shared/utils/queryParser'
import { UserCreate, UserUpdate } from './user.entity'
import { userRepository } from './user.repository'

export const createUser = async (body: UserCreate) => {
    const user = await userRepository.create(body)
    return user
}

export const findUsers = async (options: QueryOptions) => {
    const users = await userRepository.readAll({}, options)
    return { users }
}

export const findById = async (id: string) => {
    const user = await userRepository.findById(id)
    return user
}

export const findByEmail = async (email: string) => {
    const user = await userRepository.findByEmail(email)
    return user
}

export const updateUser = async (id: string, body: UserUpdate) => {
    await userRepository.update(id, body)
}

export const deleteUser = async (id: string, authorId: string) => {
    const allowed = authorId !== id
    if (!allowed) dispatchError(OPERATION_NOT_ALLOWED)
    await userRepository.delete(id)
}
