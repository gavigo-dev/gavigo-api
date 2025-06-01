import moment from 'moment'
import { compareMovies, getMovieOfDay } from '../auxiliary.mjs'
import { handlePagination } from '../../../utils/queryUtils.mjs'
import responseHandler, { ErrorData } from '../../../utils/responseHandler.mjs'
import languages from '../../../constants/languages.mjs'
import {
    LANGUAGE_NOT_PROVIDED,
    LANGUAGE_NOT_SUPPORTED
} from '../../../constants/errors.mjs'

import Movie from '../models/Movie.model.mjs'
import mongoose from 'mongoose'

export const findAll = responseHandler(async ({ req }) => {
    const { page, limit } = req.query

    const { perPage, aggregtionSteps } = handlePagination(page, limit, {
        name: 1
    })

    const query = await Movie.aggregate(aggregtionSteps)

    const { elements, total } = query[0]
    const totalPages = Math.ceil(total / perPage)
    return {
        movies: elements,
        totalPages
    }
})

export const autocomplete = responseHandler(async ({ req }) => {
    const { text, lang } = req.query

    if (!text) {
        return { movies: [] }
    }
    if (!lang) {
        throw new ErrorData(LANGUAGE_NOT_PROVIDED)
    }
    if (!languages.includes(lang)) {
        throw new ErrorData(LANGUAGE_NOT_SUPPORTED)
    }

    const query = await Movie.aggregate([
        {
            $search: {
                index: 'default',
                autocomplete: {
                    query: text,
                    path: `name.${lang}`,
                    tokenOrder: 'sequential'
                }
            }
        },
        {
            $project: {
                name: `$name.${lang}`,
                cover_image: `$cover_image.${lang}`,
                score: { $meta: 'searchScore' }
            }
        },
        { $sort: { score: -1 } },
        { $limit: 5 },
        { $project: { score: 0 } }
    ])
    return { movies: query }
})

export const guessMovie = responseHandler(async ({ req }) => {
    const { movieIds } = req.body

    const ids = Array.isArray(movieIds)
        ? movieIds
        : typeof movieIds === 'string'
          ? [movieIds]
          : []

    const random = getMovieOfDay(moment())

    const dailyMovie = await Movie.aggregate()
        .facet({
            movies: [{ $sort: { date: 1 } }]
        })
        .project({
            selected: { $arrayElemAt: ['$movies', random] }
        })

    const { selected } = dailyMovie[0]
    const guessing = await Movie.find({ _id: { $in: ids } })

    if (!guessing) {
        throw new ErrorData({
            code: 'MOVIE_NOT_FOUND',
            message: 'No movie found for the MovieId provided'
        })
    }

    const result = guessing.map((el) => {
        const comparison = compareMovies(el, selected)
        comparison._id = el._id
        return comparison
    })
    return { result }
})

export const movieOfDay = responseHandler(async ({ req }) => {
    const { lang, date } = req.query

    const day = moment(date)
    const random = getMovieOfDay(day)

    const dailyMovie = await Movie.aggregate()
        .facet({
            movies: [{ $sort: { date: 1 } }]
        })
        .project({
            selected: { $arrayElemAt: ['$movies', random] }
        })

    const { selected } = dailyMovie[0]
    return { movie: selected }
})

export const yesterdayMovie = responseHandler(async ({ req }) => {
    const day = moment().subtract(1, 'd')
    const random = getMovieOfDay(day)

    const dailyMovie = await Movie.aggregate()
        .facet({
            movies: [{ $sort: { date: 1 } }]
        })
        .project({
            selected: { $arrayElemAt: ['$movies', random] }
        })

    const { selected } = dailyMovie[0]
    return { movie: selected, number: random }
})

export const timeRemaining = responseHandler(async ({ req }) => {
    const remaining = moment().endOf('day').diff(moment(), 'minutes') + 1
    return {
        remaining,
        serverTime: moment().toISOString()
    }
})
