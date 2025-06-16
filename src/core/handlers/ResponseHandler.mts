import { INTERNAL_ERROR } from '../../constants/errors.mjs'
import { ApiError } from './classes/ApiError.class.mjs'
import { ErrorDataConstant, ErrorDTO } from './types/ErrorTypes'
import { ResponseHandler } from './types/ResponseHandlerTypes'

const fail = (
    errorData: ErrorDataConstant,
    errors?: Record<string, string>
) => {
    throw new ApiError(errorData, errors)
}

const responseHandler: ResponseHandler.Instance =
    (callback) => async (req, res, next) => {
        const providers: ResponseHandler.Providers = {
            req,
            res,
            next,
            fail
        }

        try {
            const callbackReturn = await callback(providers)

            const status = callbackReturn?.status || 200
            const json = callbackReturn?.data || null

            res.status(status).json(json)
        } catch (err) {
            console.log((err as Error).message)
            const error =
                err instanceof ApiError ? err : new ApiError(INTERNAL_ERROR)

            res.status(error.status).json(error as ErrorDTO)
        }
    }

export const failTask = fail

export default responseHandler
