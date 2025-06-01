import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import responseHandler from '../../utils/responseHandler.mjs'
import User from '../models/user.model.mjs'
import { LOGIN_ERROR } from '../../constants/errors.mjs'

const cryptoHash = (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

const createPaswordHash = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = cryptoHash(password, salt)

    return { salt, hash }
}

const validatePaswordHash = (password, hash, salt) => {
    const _hash = cryptoHash(password, salt)
    return hash === _hash
}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: 172800
    })
}


const signup = responseHandler(async ({ req }) => {
    const { email, password } = req.body
    const { hash, salt } = createPaswordHash(password)

    const user = await User.create({ email, password: hash, salt })
    const token = createToken(user._id)

    return {
        message: 'Usuário cadastrado com sucesso',
        token
    }
})

const login = responseHandler(async ({ req, error }) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).exec()
    if (!user) { error(LOGIN_ERROR) }

    const macth = validatePaswordHash(password, user.password, user.salt)
    if (!macth) { error(LOGIN_ERROR) }
    
    const token = createToken(user._id)
    return {
        message: 'Usuário logado com sucesso!',
        token
    }
})

export default {
    signup,
    login
}