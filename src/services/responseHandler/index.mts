import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ErrorData } from '../errorHandler/ErrorData.type.mjs'
import ErrorHandler from '../errorHandler/index.mjs'
import logger from '../logger/index.mjs'

export default function (callback: Function): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const error = (errorData: ErrorData) => {
            throw new ErrorHandler(errorData)
        }

        const handler = { req, res, next, error }

        try {
            const response = await callback(handler)
            res.json(response)
        } catch (err) {
            if (!(err instanceof ErrorHandler)) {
                logger.error(err as Error)
            }
            const error = new ErrorHandler()
            const response = error.getErrorData()
            res.json(response)
        }
    }
}
