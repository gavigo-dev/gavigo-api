import { BaseRepository } from '../../core/repositories/base.repository.mjs'
import UserModel from './user.model.mjs'
import { toUserDTO, UserCreate, UserDTO, UserUpdate } from './user.entity.mjs'

class UserRepository extends BaseRepository<
    (typeof UserModel)['prototype'],
    UserDTO,
    UserCreate,
    UserUpdate
> {
    constructor() {
        super(UserModel, toUserDTO)
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email }).exec()
    }
}

export const userRepository = new UserRepository()
