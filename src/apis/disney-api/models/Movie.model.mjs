import mongoose from 'mongoose'
import dbConfig from '../../../db.config.mjs'

const schema = new mongoose.Schema(
    {
        name: {
            'pt-BR': String,
            'en-US': String
        },
        cover_image: {
            'pt-BR': String,
            'en-US': String
        },
        cover_image_vertical: {
            'pt-BR': String,
            'en-US': String
        },
        main_characters: {
            'pt-BR': [String],
            'en-US': [String]
        },
        main_character_types: {
            'pt-BR': [String],
            'en-US': [String]
        },
        location: {
            'pt-BR': String,
            'en-US': String
        },
        genre: {
            'pt-BR': [String],
            'en-US': [String]
        },

        date: String,
        decade: String,
        animation_style: String,
        box_office: String
    },
    {
        collection: 'disney_animation'
    }
)

const conn = dbConfig.connect(process.env.DISNEY_API_DB)
const model = conn.model('Movie', schema)

export default model
