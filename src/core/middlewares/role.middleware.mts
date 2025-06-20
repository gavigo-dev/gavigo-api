import { Request, Response, NextFunction } from 'express'
import { UserRole } from '../../apis/users-api/user/user.entity.mjs'
import { dispatchError } from '../handlers/ErrorHandler.mjs'
import { INTERNAL_ERROR, USER_ROLE_ANAUTHORIZED } from '../constants/errors.mjs'
import { ApiError } from '../classes/ApiError.class.mjs'

export const authorizeRoles =
    (...allowedRoles: UserRole[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            if (!user || !allowedRoles.includes(user.role)) {
                return dispatchError(USER_ROLE_ANAUTHORIZED)
            }
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
