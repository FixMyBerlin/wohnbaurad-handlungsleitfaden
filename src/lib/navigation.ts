import { type CollectionEntry, getCollection } from 'astro:content'

export type ChapterWithPages = CollectionEntry<'kapitel'> & {
  pages: CollectionEntry<'seiten'>[]
}

export const pagePath = (page: CollectionEntry<'seiten'>) => `/${page.id}`

export const chapterPath = (chapter: CollectionEntry<'kapitel'>) => `/${chapter.id}`

export const getChapterTree = async (): Promise<ChapterWithPages[]> => {
  const [chapters, pages] = await Promise.all([getCollection('kapitel'), getCollection('seiten')])
  return chapters
    .toSorted((a, b) => a.data.order - b.data.order)
    .map((chapter) => ({
      ...chapter,
      pages: pages
        .filter((page) => page.data.kapitel.id === chapter.id)
        .toSorted((a, b) => a.data.order - b.data.order),
    }))
}

export const getPrevNext = (tree: ChapterWithPages[], pageId: string) => {
  const flat = tree.flatMap((chapter) => chapter.pages)
  const index = flat.findIndex((page) => page.id === pageId)
  return { prev: flat[index - 1], next: flat[index + 1] }
}
