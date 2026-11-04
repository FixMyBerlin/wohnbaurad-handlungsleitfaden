import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

// Single pages outside the chapters: about, imprint, privacy, accessibility statement
export const einzelseitenCollection = defineCollection({
  loader: glob({ base: 'src/content/einzelseiten', pattern: '[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    footer: z.boolean().default(false),
    updatedAt: z.coerce.date(),
  }),
})
