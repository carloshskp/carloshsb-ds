# Guia de Performance

Otimizações e melhores práticas de performance do Design System.

## Visão Geral

O Design System foi otimizado para performance, com foco em:

- Tree-shaking eficiente
- Bundle size reduzido
- Lazy loading quando apropriado
- CSS otimizado e minificado

## Tree-Shaking

O Design System suporta tree-shaking completo. Isso significa que apenas os componentes que você importa serão incluídos no bundle final.

### Importação Otimizada

```tsx
// ✅ Bom: Importa apenas o que precisa
import { Button, Card } from '@carloshb/ds';

// ✅ Melhor: Importação por categoria (ainda mais otimizado)
import { Button } from '@carloshb/ds/primitives';
import { CardModal } from '@carloshb/ds/modal';

// ❌ Evite: Importação de tudo (não recomendado)
import * as DS from '@carloshb/ds';
```

## Bundle Size

### Tamanho Estimado

- **Core**: ~15KB (gzipped)
- **Por componente**: ~1-3KB (gzipped)
- **Estilos**: ~8KB (gzipped)

### Otimizações

1. **ESM-only**: Permite melhor tree-shaking
2. **CSS separado**: Estilos podem ser carregados separadamente
3. **Sem dependências pesadas**: Apenas React como peer dependency

## Lazy Loading

Para componentes pesados, considere lazy loading:

```tsx
import { lazy, Suspense } from 'react';

const CardModal = lazy(() => import('@carloshb/ds/modal').then(m => ({ default: m.CardModal })));

function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CardModal isOpen={isOpen} onClose={onClose}>
        Conteúdo
      </CardModal>
    </Suspense>
  );
}
```

## CSS Otimizado

Os estilos são:

- Minificados em produção
- Sem duplicação
- Variáveis CSS para customização (sem overhead)

### Importação de Estilos

```tsx
// Importe apenas uma vez no ponto de entrada da aplicação
import '@carloshb/ds/styles.css';
```

## Best Practices

### 1. Importação Seletiva

```tsx
// ✅ Bom
import { Button } from '@carloshb/ds/primitives';

// ❌ Evite
import { Button, Card, Alert, Badge, Input, ... } from '@carloshb/ds';
```

### 2. Evite Re-renderizações Desnecessárias

```tsx
// ✅ Bom: Use useMemo para valores computados
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// ✅ Bom: Use React.memo para componentes pesados
const HeavyComponent = React.memo(({ data }) => {
  // ...
});
```

### 3. Code Splitting

```tsx
// Divida sua aplicação em chunks
const AdminPanel = lazy(() => import('./AdminPanel'));
const UserDashboard = lazy(() => import('./UserDashboard'));
```

### 4. Otimização de Imagens

Se usar imagens nos componentes:

```tsx
// ✅ Use formatos modernos
<img src="image.avif" alt="..." />

// ✅ Lazy loading de imagens
<img src="image.jpg" loading="lazy" alt="..." />
```

## Métricas

### Como Medir

Use ferramentas como:

- **Webpack Bundle Analyzer**: Analise o tamanho do bundle
- **Lighthouse**: Performance geral
- **React DevTools Profiler**: Performance de componentes

### Benchmarks

Em uma aplicação típica:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 50KB (gzipped) para uso básico

## Otimizações Futuras

Melhorias planejadas:

- [ ] Lazy loading automático de componentes pesados
- [ ] CSS-in-JS opcional para melhor tree-shaking
- [ ] Suporte a streaming SSR
- [ ] Otimização de fontes

## Troubleshooting

### Bundle muito grande

1. Verifique quais componentes estão sendo importados
2. Use análise de bundle para identificar problemas
3. Considere code splitting

### Performance ruim

1. Use React DevTools Profiler
2. Verifique re-renderizações desnecessárias
3. Considere memoização

## Recursos Adicionais

- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analysis](https://github.com/webpack-contrib/webpack-bundle-analyzer)
