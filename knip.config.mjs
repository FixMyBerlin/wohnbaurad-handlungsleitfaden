/** @type {import('knip').KnipConfig} */
// Unused exports and types stay off; files and declared deps stay strict.
export default {
  rules: {
    files: 'error',
    dependencies: 'error',
    devDependencies: 'error',
    unlisted: 'error',
    binaries: 'error',
    exports: 'off',
    types: 'off',
    enumMembers: 'off',
    duplicates: 'off',
  },
}
