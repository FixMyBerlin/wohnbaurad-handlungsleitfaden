import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const quellenCollection = defineCollection({
  loader: file('src/content/quellen.yaml'),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    year: z.number().int().optional(),
    url: z.url().optional(),
    topics: z.array(z.string()).default([]),
  }),
})
