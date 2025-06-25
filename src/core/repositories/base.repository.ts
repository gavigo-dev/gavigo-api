import { Model, Document, UpdateQuery } from 'mongoose'
import { QueryOptions } from '@/shared/utils/queryParser'
import { buildCustomFilters } from '@/shared/utils/buildCustomFilters'

interface Paginated<T> {
    items: T[]
    total: number
    page: number
    limit: number
    pages: number
}

export class BaseRepository<
    TModel extends Document,
    TDto,
    TCreate,
    TUpdate extends UpdateQuery<TModel>
> {
    constructor(
        protected readonly model: Model<TModel>,
        private toDTO: (doc: any) => TDto
    ) {}

    async create(data: TCreate): Promise<TDto | null> {
        const doc = await this.model.create(data)
        return doc ? this.toDTO(doc.toObject()) : null
    }

    async findById(id: string): Promise<TDto | null> {
        const doc = await this.model.findById(id).lean()
        return doc ? this.toDTO(doc) : null
    }

    async update(id: string, data: TUpdate): Promise<TDto | null> {
        const doc = await this.model
            .findByIdAndUpdate(id, data, {
                new: true
            })
            .lean()
        return doc ? this.toDTO(doc) : null
    }

    async delete(id: string): Promise<TDto | null> {
        const doc = await this.model.findByIdAndDelete(id).lean()
        return doc ? this.toDTO(doc) : null
    }

    async readAll(
        baseFilter: Record<string, any> = {},
        options: QueryOptions
    ): Promise<Paginated<TDto>> {
        const { query, filter, page, limit, skip } = buildCustomFilters(
            this.model,
            options,
            baseFilter
        )

        const [docs, total] = await Promise.all([
            query.skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter)
        ])

        return {
            items: docs.map(this.toDTO),
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}
