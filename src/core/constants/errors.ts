import { ErrorDataConstant } from '@/shared/handlers/types/ErrorTypes'

// general
export const INTERNAL_ERROR: ErrorDataConstant = {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
    status: 500
}

export const BAD_REQUEST: ErrorDataConstant = {
    code: 'BAD_REQUEST',
    message: 'Invalid request or parameters',
    status: 400
}

export const UNPROCESSABLE_ENTITY: ErrorDataConstant = {
    code: 'UNPROCESSABLE_ENTITY',
    message: 'Unprocessable entity',
    status: 422
}

export const ITEM_NOT_FOUND: ErrorDataConstant = {
    code: 'ITEM_NOT_FOUND',
    message: 'Item was not found',
    status: 404
}

// auth
export const NO_TOKEN_PROVIDED: ErrorDataConstant = {
    code: 'NO_TOKEN_PROVIDED',
    message: 'Token not provided',
    status: 401
}
export const INVALID_TOKEN: ErrorDataConstant = {
    code: 'INVALID_TOKEN',
    message: 'Invalid token',
    status: 401
}
export const UNAUTHORIZED_TOKEN: ErrorDataConstant = {
    code: 'UNAUTHORIZED_TOKEN',
    message: 'Unauthorized token',
    status: 403
}
export const SIGNUP_DUPLICATE: ErrorDataConstant = {
    code: 'SIGNUP_DUPLICATE',
    message: 'Email already registered',
    status: 409 // Conflict
}
export const SIGNUP_ERROR: ErrorDataConstant = {
    code: 'SIGNUP_ERROR',
    message: 'Fail to register user',
    status: 400
}
export const LOGIN_ERROR: ErrorDataConstant = {
    code: 'LOGIN_ERROR',
    message: 'Incorrect email or password',
    status: 401
}
export const USER_NOT_FOUND: ErrorDataConstant = {
    code: 'USER_NOT_FOUND',
    message: 'User not found',
    status: 404
}
export const USER_ROLE_ANAUTHORIZED: ErrorDataConstant = {
    code: 'USER_ROLE_ANAUTHORIZED',
    message: 'Forbidden: insufficient role',
    status: 403
}

// pagination
export const PAGINTATION_PARAMS: ErrorDataConstant = {
    code: 'PAGINTATION_PARAMS',
    message: 'Incorrect pagination parameters',
    status: 400
}

// i18n
export const LANGUAGE_NOT_SUPPORTED: ErrorDataConstant = {
    code: 'LANGUAGE_NOT_SUPPORTED',
    message: 'The language provided is not supported',
    status: 400
}
export const LANGUAGE_NOT_PROVIDED: ErrorDataConstant = {
    code: 'LANGUAGE_NOT_PROVIDED',
    message: 'No language provided',
    status: 400
}

// USERS

export const OPERATION_NOT_ALLOWED: ErrorDataConstant = {
    code: 'OPERATION_NOT_ALLOWED',
    message: 'Operation not allowed',
    status: 400
}
