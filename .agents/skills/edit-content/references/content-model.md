# Felder der Inhaltsdateien

Feldnamen und Enum-Werte sind englisch, die Inhalte deutsch. `?` = optional, alles andere ist Pflicht.

Typen: Text in YAML am besten in einfachen Anführungszeichen (`'…'`), zwingend, wenn er mit `PLATZHALTER:` beginnt oder einen Doppelpunkt enthält. Zahlen ohne Anführungszeichen (`year: 2015`, `order: 3`). Datum als `2026-11-30`. URLs vollständig mit `https://`. Listen als `[a, b]` oder als Zeilen mit `- `.

## Seite – `src/content/pages/<kapitel>/<seite>.mdx` (Frontmatter)

| Feld | Bedeutung |
|---|---|
| `title` | Seitentitel (wird zur h1) |
| `navTitle?` | Kurzname in der Navigation |
| `chapter` | Kapitel-ID = Ordnername: `flaechen-finden` \| `massnahmen` \| `kooperationen` \| `recht` \| `finanzierung` \| `mieterinnen-und-quartier` (Gliederung: `docs/concept/outline.md`) |
| `order` | Position im Kapitel (1, 2, 3 …) |
| `summary` | Ein Satz als Lead unter dem Titel |
| `audience` | Liste aus `housingCompanies`, `municipalities`, `transportOperators`, `experts` |
| `updatedAt` | Stand der Seite |

## Startseite – `src/content/home/index.mdx`

`eyebrow`, `title`, `summary`.

## Einzelseiten – `src/content/single-pages/<slug>.mdx`

`title`, `summary?`, `footer` (`true` = im Footer verlinkt), `updatedAt`. Derzeit: Impressum, Datenschutz, Barrierefreiheit.

## Kapitel – `src/content/chapters.yaml`

`id` (= URL), `title`, `number?`, `shortText?`, `order`.

## Kapitel-Einleitung – `src/content/chapter-intros/<kapitel-id>.mdx`

Optional. Reines MDX ohne Frontmatter, erscheint auf der Kapitelübersicht (z. B. `/finanzierung`) über der Seitenliste. Ohne Datei steht dort der `shortText`.

## Quellen – `src/content/sources.yaml`

| Feld | Bedeutung |
|---|---|
| `id` | eindeutig, z. B. `wuppertal-institut-2015` |
| `type` | `evidence` (Beleg) \| `literature` (Literaturliste) |
| `title`, `year` | Pflicht für beide Typen. `year` ist eine Zahl |
| `author?`, `publisher?`, `url?`, `accessedAt?` | |
| `topics?` | Liste, z. B. `[bike-parking]`, für `<Literature topic>` |
| `summary?` | ein bis zwei Sätze zur Literatur |

## Glossar – `src/content/glossary.yaml`

`id`, `term`, `definition`, `seeAlso?` (Liste von Glossar-IDs).

## Akteur:innen – `src/content/stakeholders.yaml`

`id`, `name`, `type`, `interest`, `influence` (`high` \| `medium` \| `low`), `tip?` (Tipp für die Ansprache), `order` (Reihenfolge in `<StakeholderCards />`).

## Downloads – `src/content/downloads.yaml`

| Feld | Bedeutung |
|---|---|
| `id` | eindeutig; `complete-guide` ist das Gesamt-PDF |
| `title`, `description` | |
| `files` | Liste: `format` (`pdf` \| `docx`), `path` (beginnt mit `/downloads/`), `sizeKb?` |

Auf welcher Seite ein Download steht, ergibt sich aus `<Download id="…" />` in der Seite. Die Übersicht `/downloads` verlinkt das automatisch.
| `license?`, `reviewedBy?` | |
| `updatedAt` | Stand |

## Förderprogramme – `src/content/funding-programs/<id>.yaml`

`name`, `funder`, `level` (`federal` \| `state` \| `eu`), `state?` (Bundesland), `scope` (was gefördert wird), `eligibility` (wer antragsberechtigt ist), `fundingRate?`, `deadline?`, `url`, `updatedAt`.
