import { z } from 'zod'
import { MovieCreateSchema, MovieUpdateSchema } from './movie.schema'

export interface TranslationData {
    title: string
    cover_image: string
    cover_image_vertical: string
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
        translations: movie.translations,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt
    }
}
