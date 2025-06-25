import { ErrorRequestHandler } from 'express'
import { ApiError } from '@/core/classes/ApiError.class'
import { INTERNAL_ERROR } from '@/core/constants/errors'
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
