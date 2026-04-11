import globals from 'globals';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import prettierConfig from 'eslint-config-prettier';

import baseConfig from '../eslint.base.config.mjs';

export default [
  // Подключаем общий базовый конфиг из корня
  ...baseConfig,

  // Игноры специфичные для бэкенда
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', '*.config.js', '*.config.mjs'],
  },

  // Основной конфиг для всех TS/JS файлов бэкенда
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
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
      'no-console': ['warn', { allow: ['error', 'warn'] }], // в продакшене лучше убрать
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',

      // Express-specific (полезно)
      'no-unused-expressions': 'error',
    },
  },

  // Специфично для тестов (если есть)
  {
    files: ['**/*.{test,spec}.{ts,js}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'n/no-process-exit': 'off',
    },
  },

  prettierConfig,
];
