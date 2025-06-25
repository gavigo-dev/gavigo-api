import { INTERNAL_ERROR } from '@/core/constants/errors'
import { ApiError } from '@/core/classes/ApiError.class'
import { dispatchError } from './ErrorHandler'
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
            const json = {
                success: true,
                data: callbackReturn?.data
            }

            res.status(status).json(json)
        } catch (err) {
            console.log((err as Error).message)
            const error =
                err instanceof ApiError ? err : new ApiError(INTERNAL_ERROR)

            const resp = {
                success: false,
                error: error.toDTO()
            }
            res.status(error.status).json(resp)
        }
    }
