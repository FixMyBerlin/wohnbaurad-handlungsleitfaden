import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const stakeholdersCollection = defineCollection({
  loader: file('src/content/stakeholders.yaml'),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    interest: z.string(),
    influence: z.enum(['high', 'medium', 'low']),
    tip: z.string().optional(),
    order: z.number().int(),
  }),
})
