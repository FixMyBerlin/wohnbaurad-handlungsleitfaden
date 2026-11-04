import { glob, readFile } from 'node:fs/promises'

// node:fs instead of Bun APIs: this also runs inside the Astro config, which Node may load
export const PLACEHOLDER = 'PLATZHALTER:'

export type Finding = { file: string; line: number; text: string }

export const readContentFiles = async (pattern = 'src/content/**/*.{mdx,yaml}') => {
  const files: { file: string; lines: string[] }[] = []
  for await (const file of glob(pattern)) {
    files.push({ file, lines: (await readFile(file, 'utf8')).split('\n') })
  }
  return files.toSorted((a, b) => a.file.localeCompare(b.file))
}

export const findPlaceholders = async () => {
  const findings: Finding[] = []
  for (const { file, lines } of await readContentFiles()) {
    lines.forEach((text, index) => {
      if (text.includes(PLACEHOLDER)) findings.push({ file, line: index + 1, text: text.trim() })
    })
  }
  return findings
}
