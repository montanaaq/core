import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules']
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}'],

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-template-curly-in-string': 'off',
      'no-console': 'warn',
      'no-debugger': 'error'
    }
  }
)
