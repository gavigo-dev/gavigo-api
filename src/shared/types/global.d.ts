import { UserDTO } from '../apis/users-api/user/user.entity.mts'

declare global {
    namespace Express {
        interface Request {
            user?: UserDTO
            lang?: string
        }
    }

    type ValueTypes<T> = T[keyof T]
}
