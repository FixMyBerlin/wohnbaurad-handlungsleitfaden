import { Glob } from 'bun'

export const PLACEHOLDER = 'PLATZHALTER:'

export type Finding = { file: string; line: number; text: string }

export const readContentFiles = async (pattern = 'src/content/**/*.{mdx,yaml}') => {
  const files: { file: string; lines: string[] }[] = []
  for await (const file of new Glob(pattern).scan('.')) {
    files.push({ file, lines: (await Bun.file(file).text()).split('\n') })
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
