import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

export const audienceLabels = {
  housingCompanies: 'Wohnungsunternehmen',
  municipalities: 'Kommunen',
  transportOperators: 'Verkehrsunternehmen',
  experts: 'Fachöffentlichkeit',
} as const

type Audience = keyof typeof audienceLabels

const audienceSchema = z.enum(Object.keys(audienceLabels) as [Audience, ...Audience[]])

// Entry id is `<chapter>/<page>` and becomes the URL path
export const pagesCollection = defineCollection({
  loader: glob({ base: 'src/content/pages', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    // Short label for the navigation
    navTitle: z.string().optional(),
    chapter: reference('chapters'),
    order: z.number().int(),
    summary: z.string(),
    audience: z.array(audienceSchema).min(1),
    updatedAt: z.coerce.date(),
  }),
})
