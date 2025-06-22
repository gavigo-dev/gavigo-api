import { BaseRepository } from '../../core/repositories/base.repository.mjs'
import UserModel from './user.model.mjs'
import { toUserDTO, UserCreate, UserDTO, UserUpdate } from './user.entity.mjs'
import { UserCreateSchema, UserUpdateSchema } from './user.schema.mjs'

class UserRepository extends BaseRepository<
    (typeof UserModel)['prototype'],
    UserDTO,
    UserCreate,
    UserUpdate
> {
    constructor() {
        super(UserModel, toUserDTO, UserCreateSchema, UserUpdateSchema)
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email }).exec()
    }
}

export const userRepository = new UserRepository()
