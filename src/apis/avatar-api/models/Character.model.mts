import mongoose from 'mongoose'
import dbConfig from '../../../db.config.mjs'

const characterSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    firstAppearance: String,
    image: String
})

const conn = dbConfig.connect(process.env.AVATAR_API_DB)
const model = conn.model('Character', characterSchema)

export default model
