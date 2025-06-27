import { langs } from '@/core/constants/supportedLanguages'
import { Request, Response, NextFunction } from 'express'

export const requireLang = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const langHeader = req.headers['accept-language']
    const langQuery = req.query.lang as string
    const lang = langQuery || langHeader?.split(',')[0] || ''
    req.lang = langs.includes(lang) ? lang : 'en-US'
    next()
}
