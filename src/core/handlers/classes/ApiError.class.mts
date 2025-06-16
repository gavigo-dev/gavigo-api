import { ErrorData, ErrorDataConstant } from '../types/ErrorTypes'

export class ApiError extends Error implements ErrorData {
    public code
    public status
    public errors
    constructor(errorData: ErrorDataConstant, errors?: Record<string, string>) {
        super(errorData.message)
        Object.setPrototypeOf(this, ApiError.prototype)

        this.code = errorData.code

        this.status = errorData.status
        this.errors = errors
    }
}
