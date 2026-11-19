# Plan: Technisches Grundgerüst Handlungsleitfaden

Stand: 04.11.2026 · Ticket: FixMyBerlin/private-issues#3745 · Status: **Entwurf, nichts davon ist gebaut**

Grundlagen:
- **[outline.md](outline.md): aktuelle Gliederung (6 Kapitel, 20 Seiten) – maßgeblich**
- [content-structure.md](content-structure.md) und [page-contents.md](page-contents.md) (überholte erste Struktur)
- FMC-Skills `new-project-setup`, `tech-stack`, `keystatic-astro`, `react-map-gl`, `finish-work`
- Analyse von rsv-info (radschnellverbindungen.info) und den RSV-Landingpages (rsv-veloroute u. a. mit rsv-shared)
- Online-Recherche zum Stand von Astro & Co. (Quellen unten)

---

## 1. Ausgangslage aus der Recherche

### Astro (Stand 04.11.2026)
| Thema | Stand | Folge für uns |
|---|---|---|
| **Astro** | 7.4.5 (2. Nov. 2026). Minor-Releases alle 3–5 Wochen | aktiv gepflegt, wir starten direkt auf 7 |
| **Eigentümer** | Seit Jan. 2026 gehört das Astro-Team zu Cloudflare. Weiter MIT und Open Source, Hosting laut Team weiter frei wählbar, Netlify ist Ecosystem-Partner | kein Grund gegen Astro. Netlify/IONOS bleiben möglich |
| **Astro 7 Breaking Changes** | Vite 8, Rust-Compiler (meldet ungeschlossene Tags als Fehler), Markdown/MDX laufen standardmäßig über die neue Pipeline „Sätteri“, remark/rehype-Plugins nur noch über `unified()` | Plugins wie GFM-Fußnoten **beim Setup prüfen**. Strengerer Compiler = gut für KI-generierte Inhalte |
| **Content Collections** | `src/content.config.ts`, `defineCollection`, Loader `glob()`/`file()` aus `astro/loaders`, `z` aus `astro/zod` (Zod 4) | genau so, wie im FMC-Skill `keystatic-astro` beschrieben |
| **@astrojs/mdx** | 8.1.2. Komponenten werden per `<Content components={…} />` übergeben | zentrale Komponenten-Liste, keine Imports in MDX |
| **Tailwind** | v4 über `@tailwindcss/vite`. `@astrojs/tailwind` ist veraltet | wie rsv-info |
| **Fonts** | Astro-Fonts-API stabil, lädt beim Build herunter, keine externen Requests | Alternative zu Fontsource, siehe E7 |
| **Pagefind** | 1.6.0, gepflegt. Einbindung als Build-Schritt nach `astro build` | Suche ohne externe Requests möglich |
| **PDF** | Paged.js **ungepflegt** (letzte Version ca. 2023). Vivliostyle 11.4 (AGPL, Node), WeasyPrint (Python), Playwright `page.pdf()` | siehe E9 |
| **MapLibre GL** | 6.16. Läuft nur im Browser | siehe E8 |
| **Netlify / IONOS** | für rein statische Seiten **kein Adapter nötig** | `output: 'static'` ohne Adapter. Production auf IONOS, Netlify nur intern |
| **Bun** | als Paketmanager offiziell dokumentiert (Recipe), mit Hinweis auf „rough edges“ | Bun als Paketmanager, Node 22.23.4+ für den Build |

### Unsere Repos
| Repo | Stack | Was wir übernehmen | Was nicht |
|---|---|---|---|
| **rsv-info** (radschnellverbindungen.info, letzter Commit 20.10.2026) | Astro 7.3, Tailwind 4 (vite), Bun 1.4, oxlint/oxfmt, knip, husky, Fontsource, react-map-gl, Keystatic | Struktur von Collections und Zod, MDX-Komponenten-Liste, Tooling, Scripts, **Kartenkomponente** (`src/components/Map/`, siehe E8), statische Kartenbilder per Script (`generate:map-images`), IONOS-Workflow (später) | Keystatic, Matomo-Snippet, fest eingetragener MapTiler-Key |
| **RSV-Landingpages** (rsv-veloroute u. a. + Submodule rsv-shared) | Astro 5, npm, Keystatic, Submodule | Idee der Komponenten-Liste in `mdxComponentsAstro` | **nicht als Vorlage**: Astro 5, npm/Bun gemischt, Submodule-Aufwand, CMS |
| **FMC-Skills** | `new-project-setup`, `tech-stack`, `keystatic-astro`, `react-map-gl` | AGPL-Lizenz, Ablauf mit 2 Commits, oxc-Configs, Script-Namen (`check`, `check-ci`, `check-pre-push`), Dependabot (Astro: erster Freitag im Monat), tsconfig für Astro, Kartenregeln (Source/Layer deklarativ, `MapProvider`, `interactiveLayerIds`, Attribution, `RTLTextPlugin={false}`) | Teile, die nur für TanStack gelten |

Keines der Repos hat eine `AGENTS.md` oder `CLAUDE.md`. Wir brauchen Agent-Doku, weil Sine die Inhalte mit KI im Code schreibt. Wie wir sie aufteilen, steht in E13.

---

## 2. Entscheidungen mit Begründung

**E1 – Neues Astro-7-Projekt nach dem Vorbild rsv-info, nicht auf Basis des rsv-shared-Templates.**
*Warum:* rsv-info ist unsere aktuellste Astro-Seite und läuft schon auf dem FMC-Stack (Astro 7, Tailwind 4, Bun, oxc). Das rsv-shared-Template ist um ein CMS, ein Submodule und Astro 5 herum gebaut. Davon brauchen wir nichts, wir müssten es erst wieder ausbauen.

**E2 – Kein CMS, Inhalte als MDX- und YAML-Dateien im Repo.**
*Warum:* So steht es in #3742/#3745. KI-Agents arbeiten am besten direkt auf Dateien. Freigaben laufen über Git (Branch → Preview → Review), damit ist jede Änderung nachvollziehbar, was für die Freigabe durch Kanzlei und BMDV wichtig ist.
Das Repo bleibt vorerst **privat**. Ob und wann es öffentlich wird (Antrag: „Open Source“), entscheiden wir später.

**E3 – Statische Ausgabe (`output: 'static'`) ohne Adapter.**
*Warum:* Wir brauchen keine Server-Funktionen. Ohne Adapter gibt es weniger Abhängigkeiten, derselbe `dist/`-Ordner läuft auf IONOS (Production) und Netlify (intern), und nach Projektende fällt kaum Wartung an.

**E4 – Content-Modell: eine MDX-Collection für die Seiten, YAML-Collections für strukturierte Daten.**

| Collection | Format | Loader | Wofür |
|---|---|---|---|
| `pages` | MDX | `glob('**/*.mdx')` in `src/content/pages/<kapitel-slug>/<seiten-slug>.mdx`. Ordner- und Dateinamen = URL, deutsch und sprechend: `/recht/grundlagen` | alle 20 Seiten der 6 Kapitel ([outline.md](outline.md)) |
| `chapterIntros` | MDX | `glob` | optionale Einleitung je Kapitelübersicht (`src/content/chapter-intros/<kapitel>.mdx`) |
| `chapters` | YAML | `file()` | Kapitel-Titel, Reihenfolge, `number`, `shortText` (Kapitelkacheln ohne Icons) |
| `home` | MDX | `glob` (eine Datei) | Startseite: `eyebrow`, `title`, Inhalt als MDX mit Bausteinen |
| `sources` | YAML | `file()` | Belege und Literatur (für `<Cite>`, `<KeyFigure>` und `<Literature>`) |
| `fundingPrograms` | YAML | `glob` | Steckbriefe (2.6) |
| `stakeholders` | YAML | `file()` | Akteur:innen für `<StakeholderCards />` (1.3) |
| `glossary` | YAML | `file()` | Begriffe (Tooltips + Anhang) |
| `downloads` | YAML | `file()` | Vorlagen und Gesamt-PDF (Eintrag `complete-guide`): `files[]`, `page` (Referenz), `license`, `reviewedBy`, `updatedAt` |

Frontmatter für `pages`: `title`, `navTitle?`, `chapter` (Referenz), `order`, `summary`, `audience[]`, `updatedAt`. Bewusst **ohne Freigabe-Status**, siehe offene Frage A3.
Alle Collection-, Feld- und Enum-Namen sind englisch (z. B. `sources.title`, `glossary.term`, `fundingPrograms.level: federal | state | eu`). Deutsch sind nur die URL-Slugs (Ordner- und Dateinamen unter `src/content/pages/`, IDs von `chapters` und `singlePages`) und die angezeigten Texte. Stakeholder-Karten kommen aus der Collection `stakeholders` (`src/content/stakeholders.yaml`), damit Akteur:innen strukturiert gepflegt werden.
*Warum:* Daten mit festem Schema (Förderprogramme, Quellen) kann die KI nicht „frei formulieren“. Zod prüft sie beim Build, ein Tippfehler bricht den Build und landet nicht online. Mit `reference()` kann ein Verweis auf eine fehlende Quelle gar nicht erst entstehen. Die Collection-Definitionen liegen in einer Datei je Collection, wie im Skill `keystatic-astro` (ohne den Keystatic-Teil).

**E5 – Feste Komponenten-Liste für MDX, Inhalte enthalten keine Imports.**
`src/components/mdx/index.ts` exportiert alle Bausteine: `Infobox`, `LegalNotice`, `Checklist`, `Cite`, `Download`, `KeyFigures`/`KeyFigure`, `Steps`/`Step`, `ScreenshotStep`, `ButtonLink`/`Button`/`ButtonGroup`, `GlossaryTerm`, `Literature`, `StakeholderCards`/`StakeholderCard`, `FundingPrograms`/`FundingProgram`, `ExampleMap`, `ChapterTiles`. Namen und Props folgen der Komponenten-API der Design-Sitzung, ins Englische übersetzt. Sie werden zentral per `<Content components={…} />` übergeben.
*Warum:* Sine bzw. die KI schreibt nur `<Infobox variant="tip">…</Infobox>` und muss keine Pfade kennen. Der Skill `edit-content` (E13) dokumentiert genau diese Liste als „erlaubtes Vokabular“. Unbekannte Komponenten lässt der Astro-7-Compiler mit einem Fehler scheitern.

**E6 – Quellen über `<Cite id="…" />`, nummeriert pro Seite, mit Quellenliste am Seitenende.**
*Warum:* Pflicht für Rechtsaussagen und Zahlen (Lektorat, #3749), und im PDF werden daraus automatisch Endnoten. Ob dafür GFM-Fußnoten reichen (Sätteri!), prüfen wir beim Setup. Die eigene Komponente ist auf jeden Fall robuster.

**E7 – Tailwind 4 + `@tailwindcss/typography`, Tokens aus Design System v2.**
Verbindlich ist [Design System v2](https://claude.ai/artifact/1nXDG4m2Husr5mcV9PCuqj) (Annikas abgestimmter Entwurf, 19.11.2026): Farben `violet-*`, `lime-300`, `cream-50`, `white` als `@theme` in `src/styles/global.css`, keine Rundungen, keine Schatten, volle Seitenbreite mit Breakpoints 768px (`md`) und 1200px (`lg`). Schriften lokal per Fontsource: Manrope (Überschriften), Source Serif 4 (Text), Lilex (Labels), Space Grotesk (Box-Titel), Literata (Unterzeile), Nabla (Wortmarke, Palette `--wbr-white`). Fließtext max. 760px (`max-w-reading`, offener Punkt mit Annika), Bausteine bis 1100px.
*Warum:* eine Quelle für die Gestaltung. Die Token-Namen sind dieselben wie im Design System.

**E8 – Karte nach FMC-Konvention: `react-map-gl/maplibre` als React-Insel (`@astrojs/react`, `client:only="react"`), Grundlage ist die Kartenkomponente aus rsv-info.**
*Warum:* Wir bleiben beim Stack (Entscheidung 04.11.). Die Regeln stehen im Skill `react-map-gl`. Geprüft habe ich beide Kandidaten:

| Kandidat | Bewertung |
|---|---|
| **rsv-info** `src/components/Map/` | **übernehmen**. Passt fast genau zu unserem Fall: `RsvMap.tsx` zeigt erst ein **statisches Kartenbild**, die interaktive Karte lädt erst nach **Opt-in** (`CookieConsent/OptIn`). Das löst Datenschutz (#3744) und PDF/ohne JS gleichzeitig. Dazu `DynamicMap.tsx` (react-map-gl, `attributionControl={false}` + `AttributionControl compact`, `RTLTextPlugin={false}`, kein Scroll-Zoom auf Mobil), `Legend.tsx`, `Attribution.tsx` und `maplibreWorker.ts` (Worker-URL für Vite) |
| **rsv-shared** `sections/maps/BaseMap.tsx` | **nicht übernehmen**: `import * as turf`, `any`-Props, auskommentierter Code, MapTiler-Key aus der Config. Widerspricht `tech-stack` und `react-map-gl` |

Was wir gegenüber rsv-info ändern:
- **Daten:** statt GeoJSON-Segmenten eine **Vektor-Source** (Martin-Tiles aus dem tilda-geo-Flächenfinder) mit `<Source type="vector">` und flachen `<Layer>`-Geschwistern, Paint-Werte aus den tilda-geo-Stilen
- **Basemap:** OpenFreeMap (FMC-Default, ohne Key) statt MapTiler mit fest eingetragenem Key
- **Klick auf Fläche:** `interactiveLayerIds` + `event.features`, `MapProvider` + `useMap()` laut Skill
- **ohne URL-Sync:** kein `?map=`-Parameter (`useMapParam`). Den brauchen wir für eine Beispielkarte nicht
- **statisches Kartenbild:** per Script, wie `generate:map-images` in rsv-info, Basemap und Tiles müssen dazu passen

Kosten: React + react-map-gl nur auf der Kartenseite. Alle anderen Seiten bleiben ohne JavaScript.

Offen ist, ob die Karte **mehrere Anwendungsszenarien** zeigt (z. B. zwei), zwischen denen man umschalten kann (A6). Technisch hieße das ein Umschalter über der Karte, der Layer-Filter oder Ausschnitt wechselt, und je Szenario ein eigenes statisches Bild für PDF und ohne JavaScript.

**E9 – PDF minimal: eine Druckseite `/gesamtfassung` mit allen Kapiteln, schlichtes Print-CSS, PDF per Playwright `page.pdf()`.**
*Warum:* Das PDF muss nur vorhanden und sauber lesbar sein, ein eigenes Styling ist nicht nötig (Entscheidung 04.11.). Playwright ist bei FMC bekannt (Skill `playwright-skill`) und kann Seitenzahlen in die Fußzeile setzen. Inhaltsverzeichnis ohne Seitenzahlen, Quellen als Endnoten pro Kapitel. Eine Quelle für Web und PDF, also keine doppelte Pflege.
Vivliostyle (CSS Paged Media, AGPL) und WeasyPrint (Python) wären die Upgrade-Pfade, falls doch ein gestaltetes PDF gewünscht wird. Paged.js ist ungepflegt.
Kommt in **Phase 5**.

**E10 – Suche mit Pagefind (Build-Schritt), aber erst in Phase 5.**
*Warum:* ca. 16 Seiten lassen sich auch über die Navigation finden. Pagefind kommt ohne externe Requests aus und ist mit einem Build-Schritt erledigt, deshalb kein Aufwand am Anfang.

**E11 – Production auf IONOS, Netlify nur intern für PR-Previews.**
- **IONOS (Production):** kümmert sich Johanna später. Vorlage ist der Workflow von rsv-info (`.github/workflows/rsv-info-build.yaml`, Deploy Now). Im Grundgerüst gibt es nur einen Platzhalter-Kommentar und `ASTRO_ENV=production` als Build-Variante.
- **Netlify (intern):** Deploy-Previews pro PR und ein Branch-Deploy für Reviews mit Sine, Henri und der GWG. **Immer `noindex`**: `X-Robots-Tag: noindex` in `netlify.toml` plus `<meta name="robots" content="noindex">`, solange `ASTRO_ENV !== 'production'`.
- An den betroffenen Stellen (`netlify.toml`, `astro.config.mjs`, Layout mit Meta-Tag, README) steht je ein kurzer englischer Kommentar, z. B. `# Internal previews only. Production is deployed to IONOS.`

*Warum:* Für Reviews brauchen wir Previews pro PR. Die bietet Netlify ohne Aufwand. Production auf IONOS wie bei rsv-info. Das Meta-Tag sichert ab, dass nichts aus Netlify indexiert wird, auch wenn der Header fehlt.
**Kein Tracking**, auch kein Matomo (Entscheidung 04.11.). Die einzigen externen Requests sind die Karte nach Opt-in (Basemap + Martin-Tiles).

**E12 – Tooling nach `tech-stack`:**
- Bun (≥ 1.3.14, rsv-info nutzt 1.4.0), `.nvmrc` mit Node 22.23.4+
- oxlint/oxfmt (Configs aus dem Skill), knip, `astro check` + `tsc`
- Scripts `check` / `check-ci` / `check-pre-push`, husky `pre-push`
- Dependabot (Astro-Zeitplan: erster Freitag im Monat)
- CI mit `check-ci` + Build
- AGPL-`LICENSE.md` und die zwei Commits laut `new-project-setup`

*Warum:* gleicher Ablauf wie in allen FMC-Repos, `finish-work` funktioniert sofort.
*Hinweis:* Der Skill sagt, dass Astro-Editorplugins noch den TS-6-Sprachserver brauchen. Das prüfe ich beim Setup und dokumentiere es.

**E13 – Agent-Doku zweigeteilt: eine schlanke `AGENTS.md` für immer gültige Regeln und ein Projekt-Skill für die Inhaltsarbeit.**

| | `AGENTS.md` (+ `CLAUDE.md` mit `@AGENTS.md`) | Skill `.agents/skills/edit-content/` |
|---|---|---|
| **Wann geladen** | **immer**, in jeder Sitzung, auch bei reiner Code-Arbeit | **bei Bedarf**: wenn die Aufgabe zur Beschreibung passt oder per Slash-Befehl `/edit-content`. Bis dahin steht nur die Beschreibung im Kontext |
| **Inhalt** | Auf Englisch: was das Repo ist, wo Inhalte liegen, `bun run check`, Code-Kommentar-Regeln (E16), Platzhalter-Prefix (E17), Tabu-Bereiche, Hinweis „für Inhalte → Skill `edit-content`“. Ziel: ≤ 60 Zeilen | Abläufe Schritt für Schritt: neue Seite anlegen, Quelle ergänzen, Förderprogramm eintragen, Platzhalter ersetzen, Preview prüfen, PR öffnen. Dazu `references/components.md` (Bausteine) und `references/content-model.md` (Felder), Ansprache **Sie**, Gendern mit Doppelpunkt, Quellenpflicht. Auf Deutsch, weil Sine ihn liest |
| **Stärke** | wird nie übersehen | lang und detailliert, ohne jede Code-Sitzung aufzublähen. Mehrere Dateien, nur die nötige wird gelesen. Explizit aufrufbar |
| **Schwäche** | jede Zeile kostet in jeder Sitzung Kontext, lange Dateien werden überlesen | löst nicht immer automatisch aus. Gegenmittel: Verweis in `AGENTS.md` und gute Beschreibung |

*Warum beides:* Die Regeln für Inhalte sind lang (Komponenten-Katalog, Abläufe) und betreffen nur einen Teil der Sitzungen. Das ist genau der Fall für einen Skill. Ein paar Regeln müssen aber **immer** gelten, auch wenn jemand „nur schnell“ etwas am Layout ändert: Check-Befehl, Kommentare, keine Rechtstexte ohne Freigabe ändern. Die gehören in `AGENTS.md`.
*Warum `AGENTS.md` statt nur `CLAUDE.md`:* Kostet nur eine Zeile (`CLAUDE.md` importiert `@AGENTS.md`) und funktioniert auch mit Cursor, das in rsv-info und rsv-builder genutzt wird.
*Für Trassenscout (Beteiligungen):* Dieselbe Logik gilt dort. Lange, aufgabenspezifische Anleitungen gehören in einen Skill, immer gültige Regeln in eine kurze `AGENTS.md`.

**Sine arbeitet mit Manus.** Daraus folgt:
- Manus unterstützt Skills im offenen SKILL.md-Format und kann sie **direkt aus einem GitHub-Repo importieren** ([Manus-Doku](https://manus.im/docs/en/features/skills)). Der Skill liegt deshalb am werkzeugneutralen Pfad `.agents/skills/edit-content/` (Empfehlung der [Agent-Skills-Spezifikation](https://agentskills.io/llms-full.txt)). `.claude/skills/edit-content` ist ein Symlink darauf, damit Claude Code ihn auch findet.
- **Nicht in fixmyskills.** fixmyskills enthält projektübergreifende Entwickler-Konventionen und wird bei allen global installiert. Dieser Skill beschreibt nur die Inhalte *dieses* Repos (Pfade, Komponenten, Collections) und würde überall sonst stören. Er muss außerdem mit dem Code zusammen versioniert werden, sonst passt der Komponenten-Katalog nicht mehr zum Stand.
- Ob Manus die `AGENTS.md` eines Repos liest, ist **nicht belegt**. Der Skill muss deshalb **für sich allein reichen** und die kritischen Regeln (Check-Befehl, Platzhalter, Tabu-Bereiche) selbst wiederholen. Diese Doppelung nehmen wir bewusst in Kauf.
- Sines Manus hat GitHub-Zugriff auf das private Repo (Import des Skills, Branch, PR).

Dazu `.claude/rules/package-json-scripts.md` laut `tech-stack`.

**E14 – entfällt:** kein Freigabe-Status pro Seite, kein Status-Banner, keine `/status`-Seite. Ob wir das doch brauchen, ist offene Frage A3.

**E15 – Konzeptpapiere ziehen nach `docs/concept/` um.** Die beiden Dateien `handlungsleitfaden-*.md` und dieser Plan gehören ins Repo, aber nicht in den Root.

**E16 – Code-Kommentare: Englisch, minimal, kein Nacherzählen.**
- Nur dort kommentieren, wo der Code das *Warum* nicht selbst zeigt (Abweichung von einer Konvention, Workaround, Hosting-Hinweis wie in E11).
- Kein Nacherzählen dessen, was der Code tut, keine Änderungshistorie („changed X to Y“), keine Kommentare für offensichtliche Props oder Imports.
- **Alle Namen englisch:** Dateien, Ordner, Komponenten, Props, Funktionen, Variablen, Collections, Felder und Enum-Werte. **Deutsch nur in URLs** (Slugs, Anker wie `#quelle-…`), in angezeigten Texten, in den Inhalten selbst und in Doku für Menschen (`AGENTS.md`, Skill, `docs/`).
- Diese Regel kommt wörtlich in die `AGENTS.md`, damit sie auch für KI-generierten Code gilt.

**E17 – Platzhalter mit eindeutigem Prefix `PLATZHALTER:`.**
- Alle Platzhalter-Texte im Gerüst und in Beispielseiten beginnen mit `PLATZHALTER:`, z. B. `PLATZHALTER: Kernaussage zur Verkehrssicherungspflicht (Quelle: Kanzlei)`. In YAML genauso, in Bild-Alt-Texten auch.
- Beispielseiten in Phase 2 enthalten **nur** Platzhalter, keine von mir formulierten Inhaltstexte. Inhalte schreibt Sine.
- Script `placeholder-check` listet alle Fundstellen. Im **Production-Build** (`ASTRO_ENV=production`, IONOS) bricht der Build ab, solange noch ein Platzhalter existiert. In Netlify-Previews werden Platzhalter gelb hervorgehoben.

*Warum:* Ein festes, deutsches, gut greifbares Wort ist für Sine, Manus und `grep` gleich eindeutig. Der Build-Abbruch stellt sicher, dass kein Platzhalter live geht.

**E18 – Ansprache „Sie“** in Navigation, Systemtexten und Inhalten. Steht in `AGENTS.md` und im Skill.

**E19 – Strukturvorgaben aus der Design-Sitzung** ([Design System](https://claude.ai/artifact/1nXDG4m2Husr5mcV9PCuqj), [Seitenentwürfe mit MDX](https://claude.ai/artifact/H4sYZXDS7P5j1tP5ipcA4F)):
- **Inhaltsseiten = Markdown + Bausteine**, kein HTML im MDX und **kein h1 im MDX**. Das prüft `content-check`.
- **Seitenlayout:**
  - Header mit Wortmarke, Suche (Phase 5) und Button „Gesamt-PDF“
  - links der Kapitelbaum mit allen Unterseiten und `aria-current`
  - rechts „Auf dieser Seite“ aus den h2, ab 1280px
  - am Seitenende die Quellenliste aus `<Cite>`, dann Vor/Zurück und der Footer
  - unter 1024px wird die Navigation zum Drawer
- **Seitenkopf aus dem Frontmatter:** Kapitelzeile, `title` als h1, `summary` als Lead, „Für: {audience} · Stand: {updatedAt}“. Das Status-Banner aus dem Entwurf entfällt (E14/A3).
- **Startseite:** eigenes Layout mit `eyebrow` und großem Titel. Der Inhalt ist MDX mit den vier Abschnitten „Projekt, Ziele und Leitbild“, „Warum sollten Wohnungsunternehmen den Radverkehr fördern?“, „Mehrwert und Motivationen“ (mit `<KeyFigures>`) und „Zielgruppe“, danach `<ChapterTiles />` (6 Kacheln) und `<Download id="complete-guide" />`. Die Seite „Über das Projekt“ ist darin aufgegangen.
- **Footer** mit Logozeile Förderer/Partner und der Seite „Erklärung zur Barrierefreiheit“ (BITV-Pflicht).

---

## 3. Verzeichnisstruktur (Ziel)

```
.
├── .agents/
│   └── skills/edit-content/   # SKILL.md + references/ (Komponenten-Katalog, Beispiele); Manus-Import
├── .claude/
│   ├── rules/package-json-scripts.md
│   └── skills/edit-content    # Symlink → .agents/skills/edit-content
├── .github/workflows/        # check-ci; IONOS-Deploy später (Vorlage rsv-info)
├── AGENTS.md                 # schlanke, immer gültige Regeln
├── CLAUDE.md                 # @AGENTS.md
├── LICENSE.md                # AGPL-3.0
├── README.md
├── astro.config.mjs
├── netlify.toml              # nur intern: PR-Previews, immer noindex
├── oxlint.config.mjs / oxfmt.config.mjs / knip.config.mjs
├── package.json / bun.lock / bunfig.toml / .nvmrc / tsconfig.json
├── docs/
│   └── concept/              # Struktur, Seiten, dieser Plan
├── scripts/
│   ├── placeholder-check.ts  # Phase 2: findet PLATZHALTER:, bricht Production-Build ab
│   ├── pdf.ts                # Phase 5: /gesamtfassung → PDF (Playwright)
│   └── map-image.ts          # Phase 5: statisches Kartenbild
├── public/
│   └── downloads/            # Vorlagen (.docx/.pdf), Gesamt-PDF
└── src/
    ├── content.config.ts
    ├── collections/          # eine Datei je Collection (Zod-Schema + Loader)
    ├── content/
    │   ├── pages/<kapitel-slug>/<seiten-slug>.mdx
    │   ├── home/index.mdx · single-pages/*.mdx
    │   ├── chapters.yaml · sources.yaml · glossary.yaml · downloads.yaml · stakeholders.yaml
    │   └── funding-programs/*.yaml
    ├── components/
    │   ├── mdx/              # Bausteine für Inhalte + index.ts (Liste)
    │   ├── layout/           # Header, Navigation, Footer, Breadcrumb, Vor/Zurück
    │   ├── Map/              # aus rsv-info: FlaechenMap (Opt-in + statisches Bild), DynamicMap, Legend, Attribution, maplibreWorker
    │   └── CookieConsent/    # Opt-in für die Karte (aus rsv-info)
    ├── layouts/              # BaseLayout, SeitenLayout, DruckLayout
    ├── pages/
    │   ├── index.astro
    │   ├── [chapter]/[page].astro    # z. B. /recht/grundlagen
    │   ├── [slug].astro              # Kapitelübersichten + Einzelseiten
    │   ├── downloads.astro · quellen.astro · glossar.astro
    │   ├── gesamtfassung.astro   # Druckseite für das PDF
    │   └── (Impressum, Datenschutz, Barrierefreiheit kommen aus single-pages über [slug].astro)
    ├── assets/               # Screenshots, Fotos (astro:assets)
    └── styles/
        ├── global.css        # Tailwind-Import
        ├── tokens.css        # aus der Design-Sitzung
        └── print.css
```

---

## 4. Phasen

| Phase | Inhalt | Ergebnis | Commit(s) |
|---|---|---|---|
| **0 Repo-Basis** | AGPL-Lizenz, README, Konzeptpapiere nach `docs/concept/` | Commit 1 (laut `new-project-setup`) | 1 |
| **1 Scaffold + Tooling** ✅ | Astro 7, MDX, Tailwind 4 (React kommt erst mit der Karte in Phase 5, sonst meldet knip es als ungenutzt), Bun, oxc, knip, tsconfig, Scripts, husky, Dependabot, CI, `netlify.toml` (intern, noindex), Platzhalter für IONOS | `bun run check` grün, leere Seite baut | 1 (Commit 2 laut Skill) |
| **2 Inhaltsmodell + Gerüst** ✅ | Collections mit Zod, Routing mit deutschen Pfaden, Layouts, Navigation (Kapitel → Seiten, Vor/Zurück), MDX-Bausteine in schlichter Form, `<Cite>`, `placeholder-check`, Seitengerüst für alle 16 Seiten **nur mit `PLATZHALTER:`-Texten** | Sine könnte loslegen | 2–3 |
| **3 AGENTS.md + Skill** ✅ | schlanke `AGENTS.md`, Skill `edit-content` (unter `.agents/skills/`, Symlink für Claude Code), Test: eine Seite nur über den Skill anlegen lassen, Import in Manus mit Sine ausprobieren | Inhaltsarbeit kann im November starten | 1 |
| **4a Design-Grundlage** ✅ (v1, durch v2 ersetzt) | Tokens als `@theme`, Inter (Fontsource, lokal), Typografie (`prose-wbr`), Seitenrahmen: Header mit Wortmarke und Drawer (`<dialog>`), Kapitelnavigation, „Auf dieser Seite“, Seitenkopf, Quellen, Vor/Zurück, Footer mit Platzhalter-Logozeile, Startseite und Kapitelkacheln | Rahmen sieht aus wie im Entwurf | 1 |
| **4b Design v2** ✅ | Design System v2 komplett: Tokens, Schriften, Seitenrahmen (Header mit Nabla-Wortmarke und Burger-Menü, Navigation, Pager, Footer mit Förderlogo), Startseite, Kapitelübersicht und alle MDX-Bausteine | Seite sieht aus wie im Design System | 1 |
| **5 Extras** | Karte aus rsv-info umbauen (Martin-Tiles, OpenFreeMap, Opt-in, statisches Bild), Druckseite + PDF per Playwright, Pagefind | Grundlage für den Launch | mehrere |

Phase 0–3 sind das eigentliche „Grundgerüst“ aus #3745. Phase 4 hängt an der Design-Sitzung, Phase 5 an Henri (Tiles, Beispielflächen) und der Datenschutzerklärung.

**Arbeitsweise:** Ich committe lokal auf `main` mit `finish-work`, je Phase mindestens ein Commit. Gepusht wird nur von dir.

---

## 5. Offene Fragen

Keine davon blockiert Phase 0–3.

- **A1 – Lizenz der Inhalte:** Code steht unter AGPL wie üblich. Für die Inhalte schlage ich CC BY 4.0 vor (Antrag: „Open Source“). Wer entscheidet, Henri? Bis dahin trägt die README „Lizenz der Inhalte: offen“ ein.
- **A2 – Manus und `AGENTS.md`:** Liest Manus die `AGENTS.md` des Repos? Das testen wir in Phase 3 gemeinsam mit Sine. Der Zugriff auf das private Repo ist geklärt, Sines Manus ist mit GitHub verbunden.
- **A3 – Freigabe-Status:** Brauchen wir doch einen Status pro Seite (z. B. für Kanzlei, GWG, BMDV), oder reicht der Überblick über PRs und Issues? Ein Status würde ein Frontmatter-Feld, ein Banner im Preview und eine Übersichtsseite bedeuten. Das lässt sich jederzeit nachrüsten.
- **A5 – Praxisbeispiel als Baustein?** Bisher ist nur ein Beispiel geplant (GWG München, Seite 3.3). Die Design-Sitzung hält einen eigenen Baustein dafür nicht für sinnvoll. Ohne ihn gibt es weiterhin keine Collection und keinen Baustein dafür. Er lässt sich nachrüsten, falls Kooperationsbeispiele aus anderen Städten dazukommen (Seite 2.3).
- **A6 – Anwendungsszenarien auf der Karte:** Zeigen wir mehrere Szenarien (z. B. zwei), zwischen denen man umschalten kann? Und wenn ja, welche? Hängt mit der Auswahl der Beispielflächen zusammen (siehe auch #3748).
- **A4 – Kartenzustimmung:** rsv-info speichert das Opt-in in einem Cookie. Übernehmen wir das (dann gehört es in die Datenschutzerklärung), oder gilt die Zustimmung nur für den Seitenbesuch, ganz ohne Speichern?

---

## Quellen (Recherche 04.11.2026)
- Astro Releases: https://github.com/withastro/astro/releases · Astro 7: https://astro.build/blog/astro-7/ · Upgrade v7: https://docs.astro.build/en/guides/upgrade-to/v7/
- Cloudflare/Astro: https://astro.build/blog/joining-cloudflare/
- Content Collections: https://docs.astro.build/en/guides/content-collections/ · MDX: https://docs.astro.build/en/guides/integrations-guide/mdx/
- Tailwind: https://docs.astro.build/en/guides/styling/ · Fonts: https://docs.astro.build/en/guides/fonts/
- Pagefind: https://registry.npmjs.org/pagefind/latest · Vivliostyle: https://registry.npmjs.org/@vivliostyle/cli/latest · Paged.js: https://github.com/pagedjs/pagedjs/releases
- MapLibre: https://github.com/maplibre/maplibre-gl-js/releases · Netlify-Adapter: https://docs.astro.build/en/guides/integrations-guide/netlify/ · Bun: https://docs.astro.build/en/recipes/bun/

- Manus Skills: https://manus.im/docs/en/features/skills · Agent-Skills-Spezifikation: https://agentskills.io/llms-full.txt

*Nicht verifiziert:* Sätteri und GFM-Fußnoten, Astro-Editorplugins mit TS 7, ob Manus `AGENTS.md` liest. Die ersten beiden prüfe ich beim Setup, das dritte mit Sine in Phase 3.
