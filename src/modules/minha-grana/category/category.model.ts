import mongoose from 'mongoose'
import dbConfig from '@/config/database'

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
            index: true
        }
    },
    { timestamps: true }
)

schema.index({ userId: 1, name: 1 }, { unique: true })

const conn = dbConfig.connect('minha-grana-api')
const model = conn.model('Category', schema)

export default model
