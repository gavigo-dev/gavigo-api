import mongoose from 'mongoose'
import dbConfig from '@/config/databse'

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        salt: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user'
        },
        name: String,
        phone: String,
        nickname: String
    },
    { timestamps: true }
)

const conn = dbConfig.connect('users-api')
const model = conn.model('User', schema)

export default model
