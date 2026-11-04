import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const kapitelCollection = defineCollection({
  loader: file('src/content/kapitel.yaml'),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    kurztext: z.string(),
    icon: z.string(),
  }),
})
