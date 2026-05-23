import mongoose from 'mongoose'
import dbConfig from '@/config/database'

const billItemSchema = new mongoose.Schema(
    {
        categoryId: {
            type: String,
            required: true
        },
        expectedAmount: {
            type: String,
            required: true
        }
    },
    { _id: false }
)

const schema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },
        bill: {
            type: [billItemSchema],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
)

const conn = dbConfig.connect('minha-grana-api')
const model = conn.model('Billing', schema)

export default model
