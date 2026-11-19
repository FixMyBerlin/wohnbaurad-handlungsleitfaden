import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

// Entry id is the chapter URL slug
export const chaptersCollection = defineCollection({
  loader: file('src/content/chapters.yaml'),
  schema: z.object({
    title: z.string(),
    number: z.number().int().min(1).optional(),
    shortText: z.string().optional(),
    icon: z.enum(['map', 'bike', 'people', 'scale', 'coins', 'home']).optional(),
    order: z.number().int(),
  }),
})
