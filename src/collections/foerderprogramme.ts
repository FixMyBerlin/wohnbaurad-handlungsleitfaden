import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const foerderprogrammeCollection = defineCollection({
  loader: glob({ base: 'src/content/foerderprogramme', pattern: '[^_]*.yaml' }),
  schema: z.object({
    name: z.string(),
    geber: z.string(),
    ebene: z.enum(['bund', 'land', 'kommune', 'eu']),
    foerdergegenstand: z.string(),
    antragsberechtigt: z.string(),
    quote: z.string().optional(),
    url: z.url().optional(),
    stand: z.coerce.date(),
  }),
})
