import type { CollectionEntry } from 'astro:content'

export const formatSource = ({ data }: CollectionEntry<'sources'>) =>
  [data.author, data.title, data.publisher, data.year].filter(Boolean).join(', ')

// The source list is a regular h2 section and shows up in "Auf dieser Seite"
export const sourcesHeading = { depth: 2, slug: 'quellen', text: 'Quellen' }
