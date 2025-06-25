import { responseHandler } from '@/shared/handlers/ResponseHandler'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import {
    UserFindByEmailSchema,
    UserFindByIdSchema,
    UserUpdateSchema
} from './user.schema'
import * as service from './user.service'

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const data = await service.findUsers(query)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = UserFindByIdSchema.parse(req.params)
    const data = await service.findById(id)
    return { data }
})

export const findByEmail = responseHandler(async ({ req }) => {
    const { email } = UserFindByEmailSchema.parse(req.params)
    const data = await service.findByEmail(email)
    return { data }
})

export const update = responseHandler(async ({ req }) => {
    const { id } = UserFindByIdSchema.parse(req.params)
    const user = UserUpdateSchema.parse(req.body)
    await service.updateUser(id, user)
})

export const deleteUser = responseHandler(async ({ req }) => {
    const { id } = UserFindByIdSchema.parse(req.params)
    await service.deleteUser(id, req.user?.id)
})
