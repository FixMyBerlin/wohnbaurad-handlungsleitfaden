import { chapterIntrosCollection } from './collections/chapterIntros'
import { chaptersCollection } from './collections/chapters'
import { downloadsCollection } from './collections/downloads'
import { fundingProgramsCollection } from './collections/fundingPrograms'
import { glossaryCollection } from './collections/glossary'
import { homeCollection } from './collections/home'
import { pagesCollection } from './collections/pages'
import { singlePagesCollection } from './collections/singlePages'
import { sourcesCollection } from './collections/sources'
import { stakeholdersCollection } from './collections/stakeholders'

export const collections = {
  chapters: chaptersCollection,
  chapterIntros: chapterIntrosCollection,
  pages: pagesCollection,
  home: homeCollection,
  singlePages: singlePagesCollection,
  sources: sourcesCollection,
  stakeholders: stakeholdersCollection,
  glossary: glossaryCollection,
  downloads: downloadsCollection,
  fundingPrograms: fundingProgramsCollection,
}
