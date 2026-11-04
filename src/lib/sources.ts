import type { CollectionEntry } from 'astro:content'

export const formatSource = ({ data }: CollectionEntry<'quellen'>) =>
  [data.autor, data.titel, data.herausgeber, data.jahr].filter(Boolean).join(', ')
