import { z } from 'zod'

export const QueryOptionsSchema = z.object({
    page: z.coerce.number().min(1).optional().default(1),
    limit: z.coerce.number().min(1).max(100).optional().default(10),
    sort: z
        .string()
        .optional()
        .transform((val) => {
            if (!val) return undefined
            // ex: sort=name,-createdAt → { name: 1, createdAt: -1 }
            return val.split(',').reduce(
                (acc, field) => {
                    const key = field.startsWith('-') ? field.slice(1) : field
                    acc[key] = field.startsWith('-') ? -1 : 1
                    return acc
                },
                {} as Record<string, 1 | -1>
            )
        }),
    select: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : undefined)),
    search: z.string().optional(),
    searchFields: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : undefined))
})

export type QueryOptions = Omit<
    z.infer<typeof QueryOptionsSchema>,
    'search' | 'searchFields'
> & {
    search?: {
        fields: string[]
        value: string
    }
}

/**
 * Parses and validates query parameters from Express
 */
export const parseQueryOptions = (query: any): QueryOptions => {
    const base = QueryOptionsSchema.parse(query)

    const final: QueryOptions = {
        ...base,
        search: undefined
    }

    if (base.search && base.searchFields?.length) {
        final.search = {
            value: base.search,
            fields: base.searchFields
        }
    }

    return final
}
