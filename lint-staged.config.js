module.exports = {
  // Lint all changed modules
  '*.{js,ts,tsx}': (filenames) =>
    `yarn eslint ${filenames.join(' ')} --quiet --fix`,
  // Format markdown, and `.mdx`
  '*.{md,mdx}': (filenames) => `prettier ${filenames.join(' ')} --write`,
  // Type check
  '**/*.{ts,tsx}': () => 'yarn tsc',
}
