import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const sourcesCollection = defineCollection({
  loader: file('src/content/sources.yaml'),
  schema: z.object({
    type: z.enum(['evidence', 'literature']),
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    year: z.number().int(),
    url: z.url().optional(),
    accessedAt: z.coerce.date().optional(),
    topics: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
})
