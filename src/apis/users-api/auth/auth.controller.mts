import { responseHandler } from '../../../core/handlers/ResponseHandler.mjs'
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    signupUser
} from './auth.service.mjs'

export const signup = responseHandler(async ({ req }) => {
    const data = await signupUser(req.body)
    return { data }
})

export const login = responseHandler(async ({ req }) => {
    const data = await loginUser(req.body)
    return { data }
})

export const logout = responseHandler(async ({ req }) => {
    await logoutUser(req.body)
    return { status: 204 }
})

export const refreshToken = responseHandler(async ({ req }) => {
    const data = await refreshAccessToken(req.body)
    return { data }
})

export const me = responseHandler(async ({ req }) => {
    const data = req.user
    return { data }
})
