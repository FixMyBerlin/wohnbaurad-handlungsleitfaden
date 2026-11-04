import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const downloadsCollection = defineCollection({
  loader: file('src/content/downloads.yaml'),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string(),
    dateien: z
      .array(
        z.object({
          format: z.enum(['docx', 'pdf']),
          // Path below `public/`, e.g. `/downloads/handlungsleitfaden.pdf`
          datei: z.string().startsWith('/downloads/'),
          groesseKb: z.number().int().optional(),
        }),
      )
      .min(1),
    seite: reference('seiten').optional(),
    lizenz: z.string().optional(),
    reviewedBy: z.string().optional(),
    stand: z.coerce.date(),
  }),
})
