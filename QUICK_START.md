# Quick Start - Design System Library

Guia rápido para começar a trabalhar com a biblioteca do Design System.

## Estrutura Rápida

```
ds/
├── src/
│   ├── components/ui/     # Componentes
│   └── public-api/         # Exports públicos
├── package.json            # Configuração do pacote
└── README.md              # Documentação principal
```

## Comandos Essenciais

```bash
# Verificar tipos
yarn type-check

# Build da biblioteca
yarn build

# Limpar build
yarn clean
```

## Adicionar Novo Componente

1. Criar arquivo em `ds/src/components/ui/[categoria]/ComponentName.tsx`
2. Exportar em `ds/src/components/ui/[categoria]/index.ts`
3. Exportar em `ds/src/public-api/index.ts`
4. Criar story no Storybook

## Migrar Componente Existente

1. Copiar de `src/components/ui/*` para `ds/src/components/ui/*`
2. Atualizar imports (remover `@/` se necessário)
3. Remover facade temporário
4. Testar no Storybook

## Exports Disponíveis

```tsx
// Todos os componentes
import { Button, Card } from 'ds';

// Por categoria
import { Button } from 'ds/primitives';
import { TerminalContainer } from 'ds/terminal';
import { CardModal } from 'ds/modal';
```

## Links Úteis

- [README.md](./README.md) - Documentação completa
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura e decisões
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
