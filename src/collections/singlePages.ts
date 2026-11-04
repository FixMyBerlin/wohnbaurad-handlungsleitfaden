import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

// Pages outside the chapters (about, imprint, privacy, accessibility statement); id is the URL slug
export const singlePagesCollection = defineCollection({
  loader: glob({ base: 'src/content/single-pages', pattern: '[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    footer: z.boolean().default(false),
    updatedAt: z.coerce.date(),
  }),
})
