import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const glossaryCollection = defineCollection({
  loader: file('src/content/glossary.yaml'),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    seeAlso: z.array(reference('glossary')).default([]),
  }),
})
