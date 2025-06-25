import RefreshTokenModel from './refreshToken.model.mjs'
import { JwtPayload } from 'jsonwebtoken'
import { AuthUtils } from '../../core/classes/AuthUtils.class.mjs'
import { ApiError } from '../../core/classes/ApiError.class.mjs'
import { dispatchError } from '../../shared/handlers/ErrorHandler.mjs'
import { userRepository } from '../user/user.repository.mjs'
import {
    AuthLoginSchema,
    AuthSignUpSchema,
    RefreshTokenSchema
} from './auth.schema.mjs'
import {
    INTERNAL_ERROR,
    INVALID_TOKEN,
    LOGIN_ERROR,
    SIGNUP_DUPLICATE,
    SIGNUP_ERROR,
    USER_NOT_FOUND
} from '../../core/constants/errors.mjs'

const createTokens = async (userId: string, role: string = 'user') => {
    try {
        const accessToken = AuthUtils.generateAccessToken({ userId, role })
        const refreshToken = AuthUtils.generateRefreshToken({ userId, role })

        await RefreshTokenModel.create({
            userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })

        return { accessToken, refreshToken }
    } catch (error) {
        dispatchError(INTERNAL_ERROR)
    }
}

export const signupUser = async (data: unknown) => {
    try {
        const parsedData = AuthSignUpSchema.parse(data)
        const { hash, salt } = AuthUtils.createPaswordHash(parsedData.password)
        const user = await userRepository.create({
            ...parsedData,
            salt,
            password: hash
        })
        if (!user) return dispatchError(SIGNUP_ERROR)
        return await createTokens(user._id, user.role)
    } catch (error) {
        console.log(error)

        if ((error as any)?.errorResponse?.code === 11000) {
            dispatchError(SIGNUP_DUPLICATE)
        }
        dispatchError(SIGNUP_ERROR)
    }
}

export const loginUser = async (data: unknown) => {
    try {
        const parsedData = AuthLoginSchema.parse(data)
        const user = await userRepository.findByEmail(parsedData.email)
        if (!user) dispatchError(USER_NOT_FOUND)

        const macth = AuthUtils.validatePaswordHash(
            parsedData.password,
            user.password,
            user.salt
        )
        if (!macth) throw null

        return await createTokens(user._id, user.role)
    } catch (err) {
        console.log(err)

        const error = err instanceof ApiError ? err : new ApiError(LOGIN_ERROR)
        dispatchError(error, error.errors)
    }
}

export const logoutUser = async (data: unknown) => {
    try {
        const parsedData = RefreshTokenSchema.parse(data)
        await RefreshTokenModel.deleteOne({ token: parsedData.token })
    } catch (error) {
        dispatchError(INVALID_TOKEN)
    }
}

export const refreshAccessToken = async (data: unknown) => {
    try {
        const parsedData = RefreshTokenSchema.parse(data)
        const payload = AuthUtils.verifyRefreshToken(
            parsedData.token
        ) as JwtPayload
        const record = await RefreshTokenModel.findOne({
            token: parsedData.token
        })
        if (!record) throw null

        const accessToken = AuthUtils.generateAccessToken({
            userId: payload.userId
        })
        return { accessToken }
    } catch (error) {
        dispatchError(INVALID_TOKEN)
    }
}

export const authenticate = async (token: string) => {
    try {
        const { userId } = AuthUtils.verifyAccessToken(token) as JwtPayload
        const user = await userRepository.findById(userId)
        return { user }
    } catch (error) {
        dispatchError(INVALID_TOKEN)
    }
}
