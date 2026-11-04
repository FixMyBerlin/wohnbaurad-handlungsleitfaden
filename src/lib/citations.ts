import { getCollection } from 'astro:content'

const citePattern = /<Cite\s+id=["']([^"']+)["']/g

// Numbering follows the first appearance in the MDX source, so <Cite> and the source list agree
export const getCitationIds = async (body: string | undefined, entryId: string) => {
  const ids = [...new Set([...(body ?? '').matchAll(citePattern)].map((match) => match[1]))]
  const known = new Set((await getCollection('quellen')).map((quelle) => quelle.id))
  const unknown = ids.filter((id) => !known.has(id))
  if (unknown.length) {
    throw new Error(
      `Unknown <Cite id> in ${entryId}: ${unknown.join(', ')} (see src/content/quellen.yaml)`,
    )
  }
  return ids
}
