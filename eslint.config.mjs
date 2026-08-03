import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** eslint-config-next 16 eksportuje gotowy flat config — bez FlatCompat. */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'src/app/(payload)/admin/importMap.js',
      'src/migrations/',
      'src/payload-types.ts',
    ],
  },
]

export default eslintConfig
