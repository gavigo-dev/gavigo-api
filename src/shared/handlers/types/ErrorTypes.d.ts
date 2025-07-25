export type ErrorDataConstant = {
    code: string
    message: string
    status: number
}

export interface ErrorData extends ErrorDataConstant {
    errors?: Record<string, string>
    toDTO: () => ErrorDTO
}

export type ErrorDTO = Omit<ErrorData, 'status' | 'toDTO'>
