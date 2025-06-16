import jwt from 'jsonwebtoken'
import User from './models/user.model.mjs'
import { INVALID_TOKEN, UNAUTHORIZED_TOKEN } from '../constants/errors.mjs'

export const requireAuth = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
        res.status(400).json({
            code: 400,
            message: INVALID_TOKEN
        })
        return
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(400).json({
                code: 400,
                message: INVALID_TOKEN
            })
        } else {
            const { userId } = decoded
            const user = await User.findOne({ _id: userId }).exec()
            if (!user) {
                res.status(401).json({
                    code: 401,
                    message: UNAUTHORIZED_TOKEN
                })
            } else {
                const { _id, email } = user
                req.user = { id: _id, email }
                next()
            }
        }
    })
}
