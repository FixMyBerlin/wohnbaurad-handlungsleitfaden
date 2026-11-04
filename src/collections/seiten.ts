import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const audienceLabels = {
  wohnungsunternehmen: 'Wohnungsunternehmen',
  kommune: 'Kommunen',
  verkehrsunternehmen: 'Verkehrsunternehmen',
  fachoeffentlichkeit: 'Fachöffentlichkeit',
} as const

const audienceSchema = z.enum(
  Object.keys(audienceLabels) as [keyof typeof audienceLabels, ...(keyof typeof audienceLabels)[]],
)

// Entry id is `<kapitel>/<seite>` and becomes the URL path
export const seitenCollection = defineCollection({
  loader: glob({ base: 'src/content/seiten', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    // Short label for the navigation, e.g. "Mehrwert"
    navTitle: z.string().optional(),
    kapitel: reference('kapitel'),
    order: z.number().int(),
    summary: z.string(),
    audience: z.array(audienceSchema).min(1),
    updatedAt: z.coerce.date(),
  }),
})
