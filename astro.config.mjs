import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { placeholderGuard } from './src/integrations/placeholderGuard'

const appRoot = fileURLToPath(new URL('.', import.meta.url))

// Fully static, no adapter: production is deployed to IONOS, Netlify is for internal previews only.
// `ASTRO_ENV` decides indexing: everything except `production` gets `noindex`.
export default defineConfig({
  site: 'https://wohnbaurad.de',
  output: 'static',
  integrations: [mdx(), sitemap(), placeholderGuard(process.env.ASTRO_ENV === 'production')],
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: browserslistToEsbuild(),
    },
    server: {
      // Bun globalStore (bunfig.toml) realpaths packages outside the project; extend Vite's default allow list.
      // @see https://bun.com/docs/pm/global-store
      fs: {
        allow: [appRoot, join(homedir(), '.bun/install/cache/links')],
      },
    },
  },
  env: {
    schema: {
      ASTRO_ENV: envField.enum({
        values: ['development', 'staging', 'production'],
        access: 'public',
        context: 'client',
        default: 'development',
      }),
    },
  },
})
