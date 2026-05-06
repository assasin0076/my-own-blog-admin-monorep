import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import { baseESLintIgnores } from './esling.base.ignores.mjs';
import globals from 'globals';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig([
  baseESLintIgnores,
  {
    ignores: ['backend/prisma.config.ts'],
  },
  tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // backend config
  {
    files: ['backend/**/*.ts'],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.paths.json', './backend/tsconfig.json'],
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: eslintPluginImport,
      n: nodePlugin,
      promise: promisePlugin,
    },
    rules: {
      // TypeScript рекомендованные правила
      ...tseslint.configs.recommended.rules,

      // Node.js специфические правила (лучшие практики)
      ...nodePlugin.configs['flat/recommended'].rules,

      // Правила для промисов и async/await
      ...promisePlugin.configs['flat/recommended'].rules,

      'import/no-unresolved': 'error',
      'n/no-missing-import': 'off',

      // TypeScript строгие и полезные правила
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // можно включить позже
      '@typescript-eslint/no-floating-promises': 'error', // важно для Express

      // Node.js лучшие практики
      'n/no-process-exit': 'error',
      'n/no-sync': 'warn',
      'n/prefer-promises/dns': 'error',
      'n/prefer-promises/fs': 'error',

      // Общие полезные правила для бэкенда
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }], // в продакшене лучше убрать
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',

      // Express-specific (полезно)
      'no-unused-expressions': 'error',
    },
  },

  // frontend config
  {
    files: ['webapp/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React 19 + JSX Runtime (автоматический import React не нужен)
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,

      // React Hooks правила (очень важно для React 19)
      ...reactHooks.configs.recommended.rules,

      // React Refresh (для Vite HMR)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // TypeScript строгие правила
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off', // можно включить позже
      '@typescript-eslint/consistent-type-imports': 'error',

      // React-specific лучшие практики
      'react/prop-types': 'off', // не нужны с TypeScript
      'react/react-in-jsx-scope': 'off', // React 17+
      'react/jsx-uses-react': 'off', // React 17+
      'react/jsx-uses-vars': 'error',

      // Дополнительные полезные правила
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/self-closing-comp': 'error',

      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "@frontend/lib/env"',
        },
      ],
    },
    settings: {
      react: {
        version: '19.0',
      },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.paths.json', './webapp/tsconfig.json'],
        },
      },
    },
  },

  prettierConfig,
]);
