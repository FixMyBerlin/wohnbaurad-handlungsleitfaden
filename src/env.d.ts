declare namespace App {
  interface Locals {
    citationIds?: string[]
  }
}

// Plain `tsc` cannot resolve .astro files; `astro check` type-checks them with full types
declare module '*.astro' {
  const Component: (props: Record<string, unknown>) => unknown
  export default Component
}
