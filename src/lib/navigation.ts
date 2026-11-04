import { type CollectionEntry, getCollection } from 'astro:content'

export type ChapterWithPages = CollectionEntry<'chapters'> & {
  pages: CollectionEntry<'pages'>[]
}

export const pagePath = (page: CollectionEntry<'pages'>) => `/${page.id}`

export const chapterPath = (chapter: CollectionEntry<'chapters'>) => `/${chapter.id}`

export const getChapterTree = async (): Promise<ChapterWithPages[]> => {
  const [chapters, pages] = await Promise.all([getCollection('chapters'), getCollection('pages')])
  return chapters
    .toSorted((a, b) => a.data.order - b.data.order)
    .map((chapter) => ({
      ...chapter,
      pages: pages
        .filter((page) => page.data.chapter.id === chapter.id)
        .toSorted((a, b) => a.data.order - b.data.order),
    }))
}

export const getPrevNext = (tree: ChapterWithPages[], pageId: string) => {
  const flat = tree.flatMap((chapter) => chapter.pages)
  const index = flat.findIndex((page) => page.id === pageId)
  return { prev: flat[index - 1], next: flat[index + 1] }
}
