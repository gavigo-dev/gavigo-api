import {
    ErrorData,
    ErrorDataConstant,
    ErrorDTO
} from '../../shared/handlers/types/ErrorTypes'

export class ApiError extends Error implements ErrorData {
    public code
    public message
    public status
    public errors
    constructor(errorData: ErrorDataConstant, errors?: Record<string, string>) {
        super(errorData.message)
        Object.setPrototypeOf(this, ApiError.prototype)

        this.code = errorData.code
        this.message = errorData.message
        this.status = errorData.status
        this.errors = errors
    }

    toDTO(): ErrorDTO {
        return {
            code: this.code,
            message: this.message,
            errors: this.errors
        }
    }
}
