// Code blocks and inline code show examples; they are not real component usages
export const stripCode = (body: string | undefined) =>
  (body ?? '').replaceAll(/```[\s\S]*?```/g, '').replaceAll(/`[^`\n]*`/g, '')
