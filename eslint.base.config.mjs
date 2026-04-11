import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Общие игноры для всего монорепа
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.min.js',
    ],
  },

  // Рекомендованные правила от ESLint (JS)
  js.configs.recommended,

  // Общие правила, которые применяются ко всем файлам (JS + TS + React + Node)
  {
    rules: {
      // Лучшие практики 2026
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': 'off', // отключаем базовую, чтобы TS-плагин взял на себя
      'no-undef': 'off', // TS/React сами справляются
      eqeqeq: 'error',
      curly: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',

      // Безопасность и читаемость
      'no-eval': 'error',
      'no-implicit-coercion': 'error',
    },
  },

  prettierConfig,
];
