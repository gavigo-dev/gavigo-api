import { NextFunction, Request, Response } from 'express'
import { ErrorData, ErrorDataConstant } from './ErrorTypes'

export namespace ResponseHandler {
    export type ResponseObject = {
        success: Boolean
        message: string
        data?: unknown
        errors?: Record<string, string>
    }

    export type Providers = {
        req: Request
        res: Response
        next: NextFunction
        fail: (
            errorData: ErrorDataConstant,
            errors?: ErrorData['errors']
        ) => void
    }

    export type Callback = (
        providers: Providers
    ) => Promise<CallbackReturn | void>

    export type CallbackReturn = {
        status?: number
        data?: unknown
    }

    export type HandlerResponse = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<void>

    export type Instance = (callback: Callback) => HandlerResponse
}
