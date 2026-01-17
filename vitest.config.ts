import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o diretório src do app principal
const appSrcPath = path.resolve(__dirname, '../src');

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      'coverage',
      '**/*.stories.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      /**
       * NOTA: Durante a fase de facade, os componentes reais estão em ../src/components/ui
       * O Vitest v8 coverage tem limitações para medir cobertura de arquivos externos.
       * 
       * Os testes estão exercitando o código real através dos facades, mas a cobertura
       * não é reportada corretamente até que os componentes sejam migrados para ds/src.
       * 
       * Após a migração completa, ativar thresholds:
       * thresholds: { lines: 95, functions: 90, branches: 90, statements: 95 }
       */
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/__tests__/**',
        '**/__snapshots__/**',
        '**/*.stories.{ts,tsx}',
      ],
      // Thresholds desabilitados durante fase de facade
      // Ativar após migração dos componentes para ds/src
      // thresholds: {
      //   lines: 95,
      //   functions: 90,
      //   branches: 90,
      //   statements: 95,
      // },
    },
  },
  resolve: {
    alias: {
      '@': appSrcPath,
    },
  },
});
