import type { AstroIntegration } from 'astro'
import { findPlaceholders } from '../../scripts/lib/contentFiles'

// Production builds (IONOS) must not ship placeholder content
export const placeholderGuard = (enabled: boolean): AstroIntegration => ({
  name: 'placeholder-guard',
  hooks: {
    'astro:build:start': async () => {
      if (!enabled) return
      const findings = await findPlaceholders()
      if (findings.length) {
        throw new Error(
          `${findings.length} placeholders left (run \`bun run placeholder-check\`), e.g. ${findings[0].file}:${findings[0].line}`,
        )
      }
    },
  },
})
