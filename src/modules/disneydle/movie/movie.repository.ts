import { BaseRepository } from '@/core/repositories/base.repository'
import MovieModel from './movie.model'
import { toMovieDTO, MovieCreate, MovieDTO, MovieUpdate } from './movie.entity'

class MovieRepository extends BaseRepository<
    (typeof MovieModel)['prototype'],
    MovieDTO,
    MovieCreate,
    MovieUpdate
> {
    constructor() {
        super(MovieModel, toMovieDTO)
    }

    async autocomplete(text: string, lang: string) {
        const movies = await this.model
            .aggregate()
            .search({
                index: 'disney-api-movies-name',
                autocomplete: {
                    query: text,
                    path: `translations.${lang}.title`,
                    tokenOrder: 'sequential'
                }
            })
            .project({
                name: `$translations.${lang}.title`,
                cover_image: `$translations.${lang}.cover_image`,
                score: { $meta: 'searchScore' }
            })
            .sort({ score: -1 })
            .limit(5)
            .project({ score: 0 })
        return movies
    }

    async findByIndex(
        index: number,
        sort: Record<string, 1 | -1> = { createdAt: 1 }
    ) {
        const doc = await this.model
            .find({})
            .sort(sort)
            .skip(index)
            .limit(1)
            .lean()

        return doc[0] ? this.toDTO(doc[0]) : null
    }
}

export const movieRepository = new MovieRepository()
