import { ErrorRequestHandler } from 'express'
import { ApiError } from '../classes/ApiError.class.mjs'
import { INTERNAL_ERROR } from '../constants/errors.mjs'
import { ErrorDataConstant } from './types/ErrorTypes'

export const dispatchError = (
    errorData: ErrorDataConstant,
    errors?: Record<string, string>
) => {
    throw new ApiError(errorData, errors)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // if (process.env.NODE_ENV !== 'prod') {
    console.log((err as Error).message)
    // }

    const error = err instanceof ApiError ? err : new ApiError(INTERNAL_ERROR)

    res.status(error.status).json(error.toDTO())
}
