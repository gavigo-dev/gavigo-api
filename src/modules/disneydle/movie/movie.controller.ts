import { responseHandler } from '@/shared/handlers/ResponseHandler'
import { parseQueryOptions } from '@/shared/utils/queryParser'
import {
    MovieFindByIdSchema,
    MovieUpdateSchema,
    MovieCreateSchema,
    MovieFindByName,
    MovieOfDaySchema
} from './movie.schema'
import * as service from './movie.service'
import fileUpload from 'express-fileupload'

export const create = responseHandler(async ({ req }) => {
    const movie = MovieCreateSchema.parse(req.body)
    const data = await service.createMovie(movie)
    return { data }
})

export const find = responseHandler(async ({ req }) => {
    const query = parseQueryOptions(req.query)
    const data = await service.findMovies(query, req.lang)
    return { data }
})

export const findById = responseHandler(async ({ req }) => {
    const { id } = MovieFindByIdSchema.parse(req.params)
    const data = await service.findById(id, req.lang)
    return { data }
})

export const update = responseHandler(async ({ req }) => {
    const { id } = MovieFindByIdSchema.parse(req.params)
    const movie = MovieUpdateSchema.parse(req.body)
    await service.updateMovie(id, movie)
})

export const deleteMovie = responseHandler(async ({ req }) => {
    const { id } = MovieFindByIdSchema.parse(req.params)
    await service.deleteMovie(id, req.user?.id)
})

export const autocomplete = responseHandler(async ({ req }) => {
    const { text } = MovieFindByName.parse(req.query)
    const data = await service.autocompleteSearch(text, req.lang)
    return { data }
})

export const guessMovie = responseHandler(async ({ req }) => {
    const { id } = MovieFindByIdSchema.parse(req.body)
    const data = await service.guessMovie(id, req.lang)
    return { data }
})

export const movieOfDay = responseHandler(async ({ req }) => {
    const { date } = MovieOfDaySchema.parse(req.query)
    const data = await service.getMovieOfDay(date, req.lang)
    return { data }
})

export const timeRemaining = responseHandler(async () => {
    const data = service.getRemainingTime()
    return { data }
})

export const uploadImage = responseHandler(async ({ req }) => {
    const { id } = MovieFindByIdSchema.parse(req.params)
    const file = req.files?.file as fileUpload.UploadedFile
    const data = await service.uploadImage(id, file)
    return { data }
})
