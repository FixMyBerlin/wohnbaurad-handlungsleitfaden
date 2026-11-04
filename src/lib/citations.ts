import { getCollection } from 'astro:content'

// <Cite id="…"> and <KeyFigure source="…"> both cite a source
const citePattern = /<(?:Cite\s[^>]*?\bid|KeyFigure\s[^>]*?\bsource)=["']([^"']+)["']/g

// Numbering follows the first appearance in the MDX source, so citations and the source list agree
export const getCitationIds = async (body: string | undefined, entryId: string) => {
  const ids = [...new Set([...(body ?? '').matchAll(citePattern)].map((match) => match[1]))]
  const known = new Set((await getCollection('sources')).map((source) => source.id))
  const unknown = ids.filter((id) => !known.has(id))
  if (unknown.length) {
    throw new Error(
      `Unknown source id in ${entryId}: ${unknown.join(', ')} (see src/content/sources.yaml)`,
    )
  }
  return ids
}
