import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

import baseConfig from '../eslint.base.config.mjs';

export default [
  // Подключаем общий базовый конфиг из корня
  ...baseConfig,

  // Игноры специфичные для фронтенда (если нужно)
  {
    ignores: [
      'dist/**',
      'build/**',
      '.next/**', // если вдруг используешь Next.js позже
      '**/coverage/**',
    ],
  },

  // Основной конфиг для всех TS/TSX/JS/JSX файлов
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: './tsconfig.json',   // раскомментируй, если хочешь правила с type-aware (рекомендую позже)
      },
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
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
  },

  // Специфично для тестов (если используешь .test.tsx или __tests__)
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  prettierConfig,
];
