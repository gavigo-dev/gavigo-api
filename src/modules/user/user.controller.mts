import { responseHandler } from '../../shared/handlers/ResponseHandler.mjs'
import { findUsers } from './user.service.mjs'

export const find = responseHandler(async ({ req }) => {
    const data = await findUsers(req.query)
    return { data }
})
