import { downloadsCollection } from './collections/downloads'
import { einzelseitenCollection } from './collections/einzelseiten'
import { foerderprogrammeCollection } from './collections/foerderprogramme'
import { glossarCollection } from './collections/glossar'
import { kapitelCollection } from './collections/kapitel'
import { quellenCollection } from './collections/quellen'
import { seitenCollection } from './collections/seiten'
import { startseiteCollection } from './collections/startseite'

export const collections = {
  kapitel: kapitelCollection,
  seiten: seitenCollection,
  startseite: startseiteCollection,
  einzelseiten: einzelseitenCollection,
  quellen: quellenCollection,
  glossar: glossarCollection,
  downloads: downloadsCollection,
  foerderprogramme: foerderprogrammeCollection,
}
