import { INTERNAL_ERROR } from '../constants/errors.mjs'
import { ApiError } from '../classes/ApiError.class.mjs'
import { dispatchError } from './ErrorHandler.mjs'
import { ResponseHandler } from './types/ResponseHandlerTypes'

export const responseHandler: ResponseHandler.Instance =
    (callback) => async (req, res, next) => {
        try {
            const providers: ResponseHandler.Providers = {
                req,
                res,
                next,
                fail: dispatchError
            }
            const callbackReturn = await callback(providers)

            const status = callbackReturn?.status || 200
            const json = callbackReturn?.data || null

            res.status(status).json(json)
        } catch (err) {
            console.log((err as Error).message)
            const error =
                err instanceof ApiError ? err : new ApiError(INTERNAL_ERROR)

            res.status(error.status).json(error.toDTO())
        }
    }
