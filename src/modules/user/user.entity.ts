import { z } from 'zod'
import { UserCreateSchema, UserUpdateSchema } from './user.schema'

export type UserRole = 'user' | 'admin' | 'moderator'

export interface User {
    _id: string
    email: string
    password: string
    role: UserRole
    salt?: string
    name?: string
    phone?: string
    nickname?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserDTO {
    _id: string
    email: string
    role?: UserRole
    name?: string
    phone?: string
    nickname?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserCreate extends z.input<typeof UserCreateSchema> {}
export interface UserUpdate extends z.input<typeof UserUpdateSchema> {}

export function toUserDTO(user: User): UserDTO {
    return {
        _id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
        phone: user.phone,
        nickname: user.nickname,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
