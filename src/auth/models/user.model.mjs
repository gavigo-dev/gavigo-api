import mongoose from 'mongoose'
import dbConfig from '../../db.config.mjs'

const schema = new mongoose.Schema({
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
    salt: String,
    name: String,
    phone: String,
    nickname: String
})

const conn = dbConfig.connect(process.env.AUTH_DB)
const model = conn.model('User', schema)

export default model
