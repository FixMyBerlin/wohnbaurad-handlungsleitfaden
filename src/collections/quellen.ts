import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const quellenCollection = defineCollection({
  loader: file('src/content/quellen.yaml'),
  schema: z.object({
    typ: z.enum(['beleg', 'literatur']),
    titel: z.string(),
    autor: z.string().optional(),
    herausgeber: z.string().optional(),
    jahr: z.number().int(),
    url: z.url().optional(),
    abgerufen: z.coerce.date().optional(),
    themen: z.array(z.string()).default([]),
    kurzbeschreibung: z.string().optional(),
  }),
})
