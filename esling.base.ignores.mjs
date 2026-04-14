import { globalIgnores } from 'eslint/config';

export const baseESLintIgnores = globalIgnores([
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/coverage/**',
  '**/*.min.js',
  '**/*.mjs',
  '**/tmp/**',
  '**/.cache/**',
]);
