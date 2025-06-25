import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret'

type ExpiresIn = jwt.SignOptions['expiresIn']

export class AuthUtils {
    constructor() {}

    // token, jwt

    static generateAccessToken = (
        payload: object,
        expiresIn: ExpiresIn = '15m'
    ) => jwt.sign(payload, ACCESS_SECRET, { expiresIn })

    static generateRefreshToken = (
        payload: object,
        expiresIn: ExpiresIn = '7d'
    ) => jwt.sign(payload, REFRESH_SECRET, { expiresIn })

    static verifyAccessToken = (token: string) =>
        jwt.verify(token, ACCESS_SECRET)

    static verifyRefreshToken = (token: string) =>
        jwt.verify(token, REFRESH_SECRET)

    // password, crypto

    static cryptoHash = (password: string, salt: string) =>
        crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    static createPaswordHash = (password: string) => {
        const salt = crypto.randomBytes(16).toString('hex')
        const hash = this.cryptoHash(password, salt)

        return { salt, hash }
    }

    static validatePaswordHash = (
        password: string,
        hash: string,
        salt: string
    ) => {
        const _hash = this.cryptoHash(password, salt)
        return hash === _hash
    }
}
