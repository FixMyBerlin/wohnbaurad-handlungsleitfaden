import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

// Optional introduction on a chapter overview page; file name = chapter id
export const chapterIntrosCollection = defineCollection({
  loader: glob({ base: 'src/content/chapter-intros', pattern: '[^_]*.mdx' }),
  schema: z.object({}),
})
