import mongoose from 'mongoose'
import dbConfig from '@/config/database'

const translationSchema = new mongoose.Schema(
    {
        title: String,
        main_characters: [String],
        main_character_types: [String],
        location: String,
        genre: [String]
    },
    { _id: false }
)

const schema = new mongoose.Schema(
    {
        date: String,
        decade: String,
        animation_style: String,
        box_office: String,
        emojis: String,
        image_drive_id: String,
        image_url: String,
        translations: {
            'pt-BR': translationSchema,
            'en-US': translationSchema
        }
    },
    { timestamps: true }
)

const conn = dbConfig.connect('disney-api')
const model = conn.model('Movie', schema)

export default model
