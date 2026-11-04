import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const kapitelCollection = defineCollection({
  loader: file('src/content/kapitel.yaml'),
  schema: z.object({
    title: z.string(),
    nummer: z.number().int().min(1).max(3).optional(),
    kurztext: z.string().optional(),
    icon: z.enum(['personen', 'haus', 'karte']).optional(),
    order: z.number().int(),
  }),
})
