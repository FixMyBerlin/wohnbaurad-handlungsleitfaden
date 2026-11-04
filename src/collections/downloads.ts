import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const downloadsCollection = defineCollection({
  loader: file('src/content/downloads.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Path below `public/`, e.g. `/downloads/handlungsleitfaden.pdf`
    file: z.string().startsWith('/downloads/'),
    format: z.enum(['pdf', 'docx']),
    seite: reference('seiten').optional(),
    lizenz: z.string().optional(),
    reviewedBy: z.string().optional(),
    stand: z.coerce.date().optional(),
  }),
})
