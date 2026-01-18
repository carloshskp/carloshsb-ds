import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import sass from 'sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Processar SCSS primeiro
const bundlePath = resolve(__dirname, 'src/styles/bundle.css');
const bundleContent = readFileSync(bundlePath, 'utf8');

// Processar SCSS imports manualmente
let processedCSS = bundleContent;
const scssImports = bundleContent.match(/@import\s+['"](.*\.scss)['"]/g);

if (scssImports) {
  for (const importLine of scssImports) {
    const match = importLine.match(/['"](.*\.scss)['"]/);
    if (match) {
      const scssPath = resolve(__dirname, 'src/styles', match[1]);
      const scssContent = readFileSync(scssPath, 'utf8');
      const cssResult = sass.compileString(scssContent, {
        loadPaths: [resolve(__dirname, 'src/styles')],
      });
      processedCSS = processedCSS.replace(importLine, cssResult.css);
    }
  }
}

// Processar CSS imports
const cssImports = processedCSS.match(/@import\s+['"](.*\.css)['"]/g);
if (cssImports) {
  for (const importLine of cssImports) {
    const match = importLine.match(/['"](.*\.css)['"]/);
    if (match) {
      const cssPath = resolve(__dirname, 'src/styles', match[1]);
      const cssContent = readFileSync(cssPath, 'utf8');
      processedCSS = processedCSS.replace(importLine, cssContent);
    }
  }
}

// Processar com PostCSS (Tailwind + Autoprefixer)
const result = await postcss([tailwindcss, autoprefixer]).process(processedCSS, {
  from: bundlePath,
  to: resolve(__dirname, 'dist/styles.css'),
});

// Escrever arquivo final
writeFileSync(resolve(__dirname, 'dist/styles.css'), result.css);
console.log('✓ CSS bundle gerado em dist/styles.css');
