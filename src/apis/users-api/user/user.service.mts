import { parseQueryOptions } from '../../../core/repositories/utils/queryParser.mjs'
import { userRepository } from './user.repository.mjs'

export const findUsers = async (query: unknown) => {
    const queryOptions = parseQueryOptions(query)

    const users = await userRepository.readAll({}, queryOptions)
    return { users }
}
