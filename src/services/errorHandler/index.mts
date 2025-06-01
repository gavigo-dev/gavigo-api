import { ErrorData } from './ErrorData.type.mjs'

const INTERNAL_ERROR: ErrorData = {
    code: 500,
    message: 'Erro interno no servidor'
}

export default class ErrorHandler extends Error {
    code: Number
    message: string
    data?: Object | null

    constructor(errorData?: ErrorData) {
        super()
        this.code = errorData?.code || INTERNAL_ERROR.code
        this.message = errorData?.message || INTERNAL_ERROR.message
        if (errorData?.data) this.data = errorData.data
    }

    getErrorData() {
        const response: ErrorData = {
            code: this.code,
            message: this.message
        }
        if (this.data) response.data = this.data
        return response
    }
}
