import { PAGINTATION_PARAMS } from '../constants/errors.mjs'
import { failTask } from '../core/handlers/ResponseHandler.mjs'

export function handlePagination(pageParam, limit, sortBy = {}) {
    try {
        const page = parseInt(pageParam)
        const perPage = parseInt(limit)

        const invalidParams =
            Number.isNaN(page) ||
            Number.isNaN(perPage) ||
            page <= 0 ||
            perPage <= 0

        if (invalidParams) {
            throw null
        }

        const skip = (page - 1) * perPage

        const aggregtionSteps = [
            {
                $facet: {
                    elements: [
                        { $sort: sortBy },
                        { $skip: skip },
                        { $limit: perPage }
                    ],
                    total: [{ $count: 'count' }]
                }
            },
            {
                $project: {
                    elements: 1,
                    total: {
                        $getField: {
                            field: 'count',
                            input: { $first: '$total' }
                        }
                    }
                }
            }
        ]

        return { perPage, skip, aggregtionSteps }
    } catch (error) {
        failTask(PAGINTATION_PARAMS)
    }
}
