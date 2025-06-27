import moment from 'moment'
import { z } from 'zod'

export const MomentSchema = z.string().transform((val, ctx) => {
    if (!val) return moment()
    const parsedDate = moment(val)
    if (!parsedDate.isValid()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date format.'
        })
        return z.NEVER
    }
    return parsedDate
})

export const MomentISOSchema = z.string().transform((val, ctx) => {
    if (!val) return moment()
    const parsedDate = moment(val, 'YYYY-MM-DD', true)
    if (!parsedDate.isValid()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date format. Expected YYYY-MM-DD.'
        })
        return z.NEVER
    }
    return parsedDate
})
