import mongoose from 'mongoose'
import dbConfig from '@/config/database'

const schema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['credit', 'pix', 'cash'],
            required: true
        },
        dueDate: {
            type: String,
            required: true
        },
        categoryId: {
            type: String,
            required: true,
            index: true
        },
        userId: {
            type: String,
            required: true,
            index: true
        }
    },
    { timestamps: true }
)

const conn = dbConfig.connect('minha-grana-api')
const model = conn.model('Transaction', schema)

export default model
