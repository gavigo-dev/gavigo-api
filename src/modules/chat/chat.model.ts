import mongoose from 'mongoose'
import dbConfig from '@/config/database'

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['user', 'model', 'system'],
            default: 'system'
        },
        content: String
    },
    { timestamps: true }
)

const schema = new mongoose.Schema(
    {
        title: String,
        model: String,
        userId: String,
        totalTokens: Number,
        temporary: Boolean,
        messages: [messageSchema]
    },
    { timestamps: true }
)

const conn = dbConfig.connect('chats-api')
const model = conn.model('Chat', schema)

export default model
