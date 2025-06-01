import { INTERNAL_ERROR } from '../constants/errors.mjs'
import * as logger from './logger.mjs'

export class ErrorData extends Error {
    constructor (errorData) {
        super()
        this.code = errorData?.code || INTERNAL_ERROR.code
        this.message = errorData?.message || INTERNAL_ERROR.message
        if (errorData?.data) this.data = errorData.data
    }

    getErrorData () {
        const response = {
            code: this.code,
            message: this.message
        }
        if (this.data) response.data = this.data
        return response
    }
}

const error = (errorData) => {
    throw new ErrorData(errorData)
}

export default (callback) => async (req, res, next) => {
    const handler = { req, res, next, error }

    try {
        const response = await callback(handler)
        res.json(response)

    } catch (error) {
        logger.error(error.message)
        if (!(error instanceof ErrorData)) error = new ErrorData()
        const response = error.getErrorData()
        res.json(response)
    }
}
