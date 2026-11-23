import { getCollection } from 'astro:content'
import { stripCode } from './mdx'
import { pagePath } from './navigation'

export type DownloadUsage = { title: string; href: string }

const downloadPattern = /<Download\s[^>]*?\bid=["']([^"']+)["']/g

// Which content pages embed a download, read from the MDX so it cannot drift from a data field
export const getDownloadUsage = async () => {
  const usage = new Map<string, DownloadUsage[]>()
  for (const page of await getCollection('pages')) {
    for (const [, id] of stripCode(page.body).matchAll(downloadPattern)) {
      usage.set(id, [...(usage.get(id) ?? []), { title: page.data.title, href: pagePath(page) }])
    }
  }
  return usage
}
