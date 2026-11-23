import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const downloadsCollection = defineCollection({
  loader: file('src/content/downloads.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    files: z
      .array(
        z.object({
          format: z.enum(['docx', 'pdf']),
          // Path below `public/`, e.g. `/downloads/handlungsleitfaden.pdf`
          path: z.string().startsWith('/downloads/'),
          sizeKb: z.number().int().optional(),
        }),
      )
      .min(1),
    license: z.string().optional(),
    reviewedBy: z.string().optional(),
    updatedAt: z.coerce.date(),
  }),
})
