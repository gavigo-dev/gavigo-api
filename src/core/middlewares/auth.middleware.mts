import { NextFunction, Request, Response } from 'express'
import { authenticate } from '../../apis/users-api/auth/auth.service.mjs'
import { ApiError } from '../classes/ApiError.class.mjs'
import {
    INTERNAL_ERROR,
    INVALID_TOKEN,
    NO_TOKEN_PROVIDED,
    UNAUTHORIZED_TOKEN
} from '../constants/errors.mjs'
import { dispatchError } from '../handlers/ErrorHandler.mjs'

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers?.authorization
        if (!authHeader) return dispatchError(NO_TOKEN_PROVIDED)

        if (!authHeader.startsWith('Bearer '))
            return dispatchError(INVALID_TOKEN)

        const token = authHeader.split(' ')[1]
        if (!token) return dispatchError(INVALID_TOKEN)

        const data = await authenticate(token)

        if (!data?.user) return dispatchError(UNAUTHORIZED_TOKEN)

        req.user = data?.user
        next()
    } catch (err) {
        if (process.env.NODE_ENV !== 'prod') {
            console.log((err as Error).message)
        }

        const error =
            err instanceof ApiError ? err : new ApiError(INTERNAL_ERROR)

        res.status(error.status).json(error.toDTO())
    }
}
