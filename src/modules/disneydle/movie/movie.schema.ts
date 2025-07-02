import { MomentISOSchema } from '@/shared/schemas/global.schemas'
import moment from 'moment'
import { z } from 'zod'

const translationSchema = z.object({
    title: z.string(),
    cover_image: z.string(),
    cover_image_vertical: z.string(),
    main_characters: z.array(z.string()),
    main_character_types: z.array(z.string()),
    location: z.string(),
    genre: z.array(z.string())
})

export const MovieCreateSchema = z.object({
    date: z.string(),
    decade: z.string(),
    animation_style: z.string(),
    box_office: z.string(),
    translations: translationSchema
})

export const MovieUpdateSchema = z.object({
    date: z.string().optional(),
    decade: z.string().optional(),
    animation_style: z.string().optional(),
    box_office: z.string().optional(),
    emojis: z.string().length(4),
    translations: translationSchema.partial().optional()
})

export const MovieFindByIdSchema = z.object({
    id: z.string()
})

export const MovieFindByName = z.object({
    text: z.string()
})

export const MovieOfDaySchema = z.object({
    date: z
        .union([
            MomentISOSchema,
            z.literal('yesterday').transform(() => moment().subtract(1, 'd'))
        ])
        .optional()
        .transform((val) => (!!val ? val : moment()))
})
