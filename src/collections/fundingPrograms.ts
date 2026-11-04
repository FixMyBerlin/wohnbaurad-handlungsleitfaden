import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const fundingProgramsCollection = defineCollection({
  loader: glob({ base: 'src/content/funding-programs', pattern: '[^_]*.yaml' }),
  schema: z.object({
    name: z.string(),
    funder: z.string(),
    level: z.enum(['federal', 'state', 'eu']),
    state: z.string().optional(),
    scope: z.string(),
    eligibility: z.string(),
    fundingRate: z.string().optional(),
    deadline: z.string().optional(),
    url: z.url(),
    updatedAt: z.coerce.date(),
  }),
})
