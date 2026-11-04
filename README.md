# Handlungsleitfaden WohnBauRad

Website and PDF of the *Handlungsleitfaden* from the NRVP project WohnBauRad: how housing companies (Wohnungsbaugesellschaften) can use their land for cycling infrastructure. Domain: wohnbaurad.de.

## Docs

- [docs/konzept/plan-grundgeruest.md](./docs/konzept/plan-grundgeruest.md) – technical plan and decisions
- [docs/konzept/handlungsleitfaden-struktur.md](./docs/konzept/handlungsleitfaden-struktur.md) – content structure
- [docs/konzept/handlungsleitfaden-seiten.md](./docs/konzept/handlungsleitfaden-seiten.md) – page by page content

## Developing

- Install [Bun](https://bun.sh/docs/installation) (`packageManager` in `package.json`), then `bun install`
- `bun run dev` starts the Astro dev server
- `bun run check` runs type check, lint, format, tests and a non-blocking knip. Run it before committing. CI runs the read-only `bun run check-ci`, husky runs `bun run check-pre-push` on push.
- TypeScript stays on 6.x until `astro check` supports TypeScript 7.
- Content lives in `src/content/` (MDX pages, YAML data). Unfinished text starts with `PLATZHALTER:`; `bun run placeholder-check` lists all of them, and a production build (`ASTRO_ENV=production`) fails while any are left.

## Deployment

- **Production: IONOS** (not set up yet). Build with `ASTRO_ENV=production bun run build`, upload `dist/`.
- **Netlify: internal previews only** (PR deploy previews, branch deploys). Always `noindex` via `X-Robots-Tag` in `netlify.toml` and the robots meta tag for every `ASTRO_ENV` except `production`.

## License

The code is licensed under AGPL-3.0, see [LICENSE.md](./LICENSE.md). The license for the content is not decided yet.
