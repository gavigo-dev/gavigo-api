import { Request, Response, NextFunction } from 'express'
import { UserRole } from '@/modules/user/user.entity'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { INTERNAL_ERROR, USER_ROLE_ANAUTHORIZED } from '@/core/constants/errors'
import { ApiError } from '@/core/classes/ApiError.class'

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

            const resp = {
                success: false,
                error: error.toDTO()
            }
            res.status(error.status).json(resp)
        }
    }
