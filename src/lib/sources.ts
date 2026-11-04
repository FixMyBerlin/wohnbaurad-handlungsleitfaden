import type { CollectionEntry } from 'astro:content'

export const formatSource = ({ data }: CollectionEntry<'sources'>) =>
  [data.author, data.title, data.publisher, data.year].filter(Boolean).join(', ')
