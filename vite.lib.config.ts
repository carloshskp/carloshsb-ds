import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { unlinkSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Resolve TypeScript compiler path de forma compatível com Yarn PnP
const typescriptPath = require.resolve('typescript');
const typescriptCompilerFolder = path.dirname(path.dirname(typescriptPath));

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      outDir: 'dist/types',
      rollupTypes: true,
      entryRoot: 'src',
      rollupOptions: {
        typescriptCompilerFolder: typescriptCompilerFolder,
      },
    }),
    // Plugin para remover ds.css após o build
    {
      name: 'remove-ds-css',
      closeBundle() {
        const dsCssPath = path.resolve(__dirname, 'dist/ds.css');
        if (existsSync(dsCssPath)) {
          unlinkSync(dsCssPath);
          console.log('✓ Removido dist/ds.css (não necessário)');
        }
      },
    },
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
    // CSS code splitting desabilitado para gerar um único arquivo CSS
    cssCodeSplit: false,
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
});
