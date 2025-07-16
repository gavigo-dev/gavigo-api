import { z } from 'zod'
import { MovieCreateSchema, MovieUpdateSchema } from './movie.schema'

export interface TranslationData {
    title: string
    cover_image: string
    main_characters: string[]
    main_character_types: string[]
    location: string
    genre: string[]
}

export interface Movie {
    _id: string
    date: string
    decade: string
    animation_style: string
    box_office: string
    emojis: string
    image_drive_id: String
    image_url: String
    translations: {
        [lang: string]: TranslationData
    }
    createdAt?: Date
    updatedAt?: Date
}

export interface TranslatedMovie
    extends Omit<Movie, 'translations'>,
        Partial<TranslationData> {}

export interface MovieDTO {
    _id: string
    date: string
    decade: string
    animation_style: string
    box_office: string
    emojis: string
    image_drive_id: String
    image_url: String
    translations?: {
        [lang: string]: TranslationData
    }
    createdAt?: Date
    updatedAt?: Date
}

export interface MovieCreate extends z.input<typeof MovieCreateSchema> {}
export interface MovieUpdate extends z.input<typeof MovieUpdateSchema> {}

export function toMovieDTO(movie: Movie): MovieDTO {
    return {
        _id: movie._id,
        date: movie.date,
        decade: movie.decade,
        animation_style: movie.animation_style,
        box_office: movie.box_office,
        emojis: movie.emojis,
        image_drive_id: movie.image_drive_id,
        image_url: movie.image_url,
        translations: movie.translations,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt
    }
}
