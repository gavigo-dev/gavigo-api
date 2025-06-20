import mongoose from 'mongoose'
import dbConfig from '../../../db.config.mjs'

const RefreshTokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        token: { type: String, required: true },
        expiresAt: { type: Date, required: true }
    },
    { timestamps: true }
)

const conn = dbConfig.connect('users-api')
const model = conn.model('RefreshToken', RefreshTokenSchema)

export default model
