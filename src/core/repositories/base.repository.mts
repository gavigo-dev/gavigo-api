// src/repositories/base.repository.ts
import { Model, Document, UpdateQuery } from 'mongoose'
import { ZodSchema } from 'zod'
import { QueryOptions } from './utils/queryParser.mjs'
import { buildCustomFilters } from './utils/buildCustomFilters.mjs'

interface Paginated<T> {
    data: T[]
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
        private toDTO: (doc: any) => TDto,
        private createSchema: ZodSchema<TCreate>,
        private updateSchema: ZodSchema<TUpdate>
    ) {}

    async create(data: unknown): Promise<TDto> {
        const parsed = this.createSchema.parse(data)
        const doc = await this.model.create(parsed)
        return this.toDTO(doc.toObject())
    }

    async findById(id: string): Promise<TDto | null> {
        const doc = await this.model.findById(id).lean()
        return doc ? this.toDTO(doc) : null
    }

    async update(id: string, data: unknown): Promise<TDto | null> {
        const parsed = this.updateSchema.parse(data)
        const doc = await this.model
            .findByIdAndUpdate(id, parsed, {
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
            data: docs.map(this.toDTO),
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}
