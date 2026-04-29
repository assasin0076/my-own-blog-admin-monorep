import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, './src/*'),
      '@backend': path.resolve(__dirname, '../backend/src'),
      '@frontend': path.resolve(__dirname, './src'),
    },
    mainFields: ['module', 'main'],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@frontend/styles/mixins" as *;`,
      },
    },
  },
});
