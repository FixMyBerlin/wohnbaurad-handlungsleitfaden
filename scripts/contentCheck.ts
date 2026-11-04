import { type Finding, readContentFiles } from './lib/contentFiles'

// Content MDX is Markdown plus registered components only: the page title is the h1, no raw HTML
const htmlTag = /<\/?[a-z][a-z0-9-]*[\s/>]/

const errors: (Finding & { rule: string })[] = []
for (const { file, lines } of await readContentFiles('src/content/**/*.mdx')) {
  let inFence = false
  let inFrontmatter = false
  lines.forEach((text, index) => {
    if (index === 0 && text === '---') inFrontmatter = true
    else if (inFrontmatter && text === '---') inFrontmatter = false
    if (inFrontmatter) return
    if (text.trimStart().startsWith('```')) inFence = !inFence
    if (inFence) return
    const finding = { file, line: index + 1, text: text.trim() }
    if (/^#\s/.test(text))
      errors.push({ ...finding, rule: 'no h1 in content, the title comes from the frontmatter' })
    if (htmlTag.test(text.replaceAll(/`[^`]*`/g, '')))
      errors.push({ ...finding, rule: 'no HTML in content, use Markdown or a component' })
  })
}

for (const { file, line, text, rule } of errors)
  console.error(`${file}:${line}  ${rule}\n  ${text}`)
if (errors.length) process.exit(1)
