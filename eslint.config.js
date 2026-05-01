import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  prettierConfig,
  // The web/shared lint config only covers the Vite frontend and the shared
  // workspace. Native (training-app-mobile / apps/mobile / apps/macos) and
  // build artefacts have their own toolchains and lint configs.
  globalIgnores([
    'dist',
    'desktop-dist',
    'training-app-mobile',
    'apps/macos',
    'apps/mobile',
    'public',
    'scripts',
    'workspace-files',
    '.blackbox',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

