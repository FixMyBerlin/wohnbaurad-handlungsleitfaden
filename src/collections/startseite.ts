import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const startseiteCollection = defineCollection({
  loader: glob({ base: 'src/content/startseite', pattern: 'index.mdx' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    summary: z.string(),
  }),
})
