import moment, { Moment } from 'moment'
import seedrandom from 'seedrandom'
import fileUpload from 'express-fileupload'
import { dispatchError } from '@/shared/handlers/ErrorHandler'
import { QueryOptions } from '@/shared/utils/queryParser'
import {
    MovieCreate,
    MovieDTO,
    MovieUpdate,
    TranslatedMovie
} from './movie.entity'
import { movieRepository } from './movie.repository'
import {
    BAD_REQUEST,
    INTERNAL_ERROR,
    ITEM_NOT_FOUND,
    LANGUAGE_NOT_PROVIDED,
    OPERATION_NOT_ALLOWED
} from '@/core/constants/errors'
import { GoogleUtils } from '@/core/classes/GoogleUtils'

const guessStatus = {
    CORRECT: 'correct',
    PARTIAL: 'partial',
    WRONG: 'wrong',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than'
}

const translateMovie = (
    movie: MovieDTO,
    lang: string = 'en-US'
): TranslatedMovie => {
    const { translations, ...rest } = movie
    return {
        ...rest,
        ...translations?.[lang]
    }
}

const getDailyId = (itemsLength: number, day: Moment) => {
    const seed = day.format('YYYY-MM-DD')
    const random = seedrandom(seed)()
    return Math.floor(random * (itemsLength - 1))
}

const compareMovies = (movie1: TranslatedMovie, movie2: TranslatedMovie) => {
    function compareSimple(a: string, b: string) {
        return a === b ? guessStatus.CORRECT : guessStatus.WRONG
    }
    function compareNumberFields(a: string, b: string) {
        const transform = (txt: string) => {
            txt = txt.replaceAll(/[M$s]/g, '')
            if (txt.includes('B')) {
                txt = txt.replaceAll('B', '')
                return parseInt(txt) * 1000
            }
            return parseInt(txt)
        }
        const n1 = transform(a)
        const n2 = transform(b)
        return n1 === n2
            ? guessStatus.CORRECT
            : n1 > n2
              ? guessStatus.GREATER_THAN
              : guessStatus.LESS_THAN
    }
    function compareArrFields(a: string[], b: string[]) {
        const arr1 = a.sort()
        const arr2 = b.sort()
        return JSON.stringify(arr1) === JSON.stringify(arr2)
            ? guessStatus.CORRECT
            : arr1.some((item) => arr2.includes(item))
              ? guessStatus.PARTIAL
              : guessStatus.WRONG
    }

    const compareFunctions: Partial<Record<keyof TranslatedMovie, Function>> = {
        animation_style: compareSimple,
        decade: compareNumberFields,
        box_office: compareNumberFields,
        title: compareSimple,
        location: compareSimple,
        main_character_types: compareArrFields,
        genre: compareArrFields
    }

    const result: Partial<
        Record<
            keyof TranslatedMovie,
            { value?: ValueTypes<TranslatedMovie>; status: string }
        >
    > = {}

    for (const k in compareFunctions) {
        const key = k as keyof TranslatedMovie
        const fn = compareFunctions[key]

        result[key] = {
            value: Array.isArray(movie1[key])
                ? [...movie1[key]].join(', ')
                : movie1[key],
            status: fn?.(movie1[key], movie2[key])
        }
    }

    const isCorrect = Object.values(result).every((val) => {
        return val.status === guessStatus.CORRECT
    })

    return {
        fields: result,
        image: movie1.cover_image,
        correct: isCorrect
    }
}

export const createMovie = async (body: MovieCreate) => {
    const movie = await movieRepository.create(body)
    return movie
}

export const findMovies = async (
    options: QueryOptions,
    translation?: string
) => {
    const movies = await movieRepository.readAll({}, options)
    if (translation) {
        movies.items = movies.items.map((movie) =>
            translateMovie(movie, translation)
        )
    }
    return movies
}

export const findById = async (id: string, translation?: string) => {
    const movie = await movieRepository.findById(id)
    return movie && translation ? translateMovie(movie, translation) : movie
}

export const updateMovie = async (id: string, body: MovieUpdate) => {
    await movieRepository.update(id, body)
}

export const deleteMovie = async (id: string, authorId: string) => {
    const allowed = authorId !== id
    if (!allowed) dispatchError(OPERATION_NOT_ALLOWED)
    await movieRepository.delete(id)
}

export const autocompleteSearch = async (text: string, lang?: string) => {
    if (!text) return []
    if (!lang) return dispatchError(LANGUAGE_NOT_PROVIDED)

    const movies = await movieRepository.autocomplete(text, lang)
    return movies
}

export const guessMovie = async (guessId: string, translation?: string) => {
    const guess = await movieRepository.findById(guessId)
    if (!guess) return dispatchError(ITEM_NOT_FOUND)

    const movie1 = translateMovie(guess, translation)
    const movie2 = await getMovieOfDay(moment(), translation)

    const data = compareMovies(movie1, movie2)
    return data
}

export const getMovieOfDay = async (day: Moment, translation?: string) => {
    const itemsLength = await movieRepository.countItems()
    const index = getDailyId(itemsLength, day)
    const movie = await movieRepository.findByIndex(index, { date: 1 })
    if (!movie) return dispatchError(INTERNAL_ERROR)
    return translateMovie(movie, translation)
}

export const getRemainingTime = () => {
    const remainingMinutes = moment().endOf('day').diff(moment(), 'minutes') + 1
    const serverTime = moment().toISOString()
    return {
        remainingMinutes,
        serverTime
    }
}

export const uploadImage = async (
    movieId: string,
    file?: fileUpload.UploadedFile
) => {
    if (!file) return dispatchError(BAD_REQUEST)

    const buffer = file.data

    const { fileId, webContentLink } = await GoogleUtils.Drive.uploadBuffer(
        buffer,
        file.name,
        file.mimetype
    )

    await movieRepository.update(movieId, {
        image_drive_id: fileId,
        image_url: webContentLink
    })

    return fileId
}

export const listImages = async (folderId: string) => {
    return await GoogleUtils.Drive.list(folderId)
}
