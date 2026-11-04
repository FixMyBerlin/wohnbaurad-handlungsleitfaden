import { findPlaceholders } from './lib/contentFiles'

const findings = await findPlaceholders()
for (const { file, line, text } of findings) console.log(`${file}:${line}  ${text}`)
const files = new Set(findings.map((finding) => finding.file)).size
console.log(`\n${findings.length} placeholders in ${files} files`)
