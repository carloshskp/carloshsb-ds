import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/public-api/index.ts'),
        primitives: path.resolve(__dirname, 'src/components/ui/primitives/index.ts'),
        terminal: path.resolve(__dirname, 'src/components/ui/terminal/index.ts'),
        modal: path.resolve(__dirname, 'src/components/ui/modal/CardModal.tsx'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      // Externalizar peerDependencies (não são bundled, fornecidas pelo consumidor)
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom', // peer opcional
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
        },
        // Preserva módulos para melhor tree-shaking
        preserveModules: false,
      },
    },
    // Minificação e source maps
    minify: 'esbuild',
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
});
