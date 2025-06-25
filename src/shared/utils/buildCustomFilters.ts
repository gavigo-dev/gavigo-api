import { Model, Query } from 'mongoose'
import { QueryOptions } from './queryParser'

export interface BuildQueryResult<T> {
    query: Query<T[], T> // Mongoose query object
    filter: Record<string, any>
    page: number
    limit: number
    skip: number
}

export function buildCustomFilters<T>(
    model: Model<T>,
    options: QueryOptions,
    baseFilter: Record<string, any> = {}
): BuildQueryResult<T> {
    const page = Math.max(1, options.page || 1)
    const limit = Math.max(1, options.limit || 10)
    const skip = (page - 1) * limit

    let filter: Record<string, any> = { ...baseFilter }

    // Text search (using regex)
    if (options.search?.value && options.search?.fields?.length) {
        const regex = new RegExp(options.search.value, 'i')
        filter['$or'] = options.search.fields.map((field) => ({
            [field]: regex
        }))
    }

    const query = model.find(filter)

    // Select fields
    if (options.select && options.select.length) {
        query.select(options.select.join(' '))
    }

    // Sort
    if (options.sort) {
        query.sort(options.sort)
    }

    return { query, filter, page, limit, skip }
}
