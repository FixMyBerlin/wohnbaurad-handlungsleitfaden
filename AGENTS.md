# AGENTS.md

Static Astro 7 site (plus a PDF) for the *Handlungsleitfaden WohnBauRad*. Production runs on IONOS; Netlify only serves internal PR previews and is always `noindex`. Decisions and reasons: [docs/concept/technical-plan.md](docs/concept/technical-plan.md).

## Content work → skill `edit-content`

Writing or changing content (pages, sources, glossary, downloads, funding programmes, placeholders) follows the skill in [`.agents/skills/edit-content/`](.agents/skills/edit-content/SKILL.md). Load it before touching `src/content/`.

## Where things are

- `src/content/` – content: MDX pages under `pages/<chapter-slug>/<page-slug>.mdx`, optional chapter intros under `chapter-intros/`, YAML data (`sources`, `glossary`, `downloads`, `chapters`, `stakeholders`, `funding-programs/`). Chapter and page outline: [docs/concept/outline.md](docs/concept/outline.md)
- `src/collections/` – Zod schema per collection, registered in `src/content.config.ts`
- `src/components/mdx/` – building blocks usable in content MDX; `index.ts` is the only registry (no imports in MDX)
- `src/components/layout/`, `src/layouts/` – page frame, navigation, source list
- `src/pages/` – routes; file names are URLs, so they stay German
- `src/assets/` – images (logos, map placeholder, screenshots) used via `astro:assets`
- `src/styles/global.css` – design tokens (`@theme`) and running-text styles
- `src/showcase/bausteine.mdx` – every building block with example data and code, served at `/intern/bausteine` in previews only; `example-*` data entries exist only for it
- `scripts/` – content check and placeholder listing

## Commands

- Node from `.nvmrc` must be on `PATH` (`astro check` and the Astro config run under Node)
- `bun install`, `bun run dev`
- `bun run check` – must pass before every commit (type check, lint incl. content check, format, tests, knip)
- `bun run placeholder-check` – lists all `PLATZHALTER:` texts; a production build (`ASTRO_ENV=production`) fails while any are left

## Rules

- **Names are English** everywhere in code and data: files, folders, components, props, functions, variables, collections, fields, enum values. German only in URLs (slugs, anchors), displayed text and the content itself.
- **Code comments:** English, minimal, only the *why* the code cannot show (a deviation, workaround, hosting note). No retelling what the code does, no change history.
- **Content MDX** is Markdown plus registered components: no h1 (the title comes from the frontmatter), no HTML, no imports. `bun run check` enforces the first two.
- **Placeholders** start with `PLATZHALTER:`. Never invent content to replace one; leave it or ask.
- **Legal texts** (`<LegalNotice>` pages, templates in `public/downloads/`) change only after the law firm signed off.
- **No tracking and no new external requests.** The only external requests are the map tiles after opt-in (phase 5).
- **Design source of truth:** [Design System v2](https://claude.ai/artifact/1nXDG4m2Husr5mcV9PCuqj) (tokens, rules per building block). Token names in `global.css` match it. Any design change made in code is reported back to the design system so both stay identical.
- **Keep the skill in sync:** when a component, prop or collection field changes, update `.agents/skills/edit-content/references/` and the showcase `src/showcase/bausteine.mdx`.
- Stack conventions follow the FMC skills (`tech-stack`, `react-map-gl`, `finish-work`). Commit messages: `Topic: Description` plus user-facing bullets.
