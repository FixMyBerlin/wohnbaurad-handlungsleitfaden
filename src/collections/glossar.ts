import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const glossarCollection = defineCollection({
  loader: file('src/content/glossar.yaml'),
  schema: z.object({
    begriff: z.string(),
    definition: z.string(),
    siehe: z.array(reference('glossar')).default([]),
  }),
})
