# Guia de Contribuição - Design System Library

Este documento descreve como contribuir para a biblioteca do Design System.

## Estrutura de Desenvolvimento

### Fase Atual: Migração

A biblioteca está em fase de migração. Os componentes ainda estão sendo movidos de `src/components/ui/*` para `ds/src/components/ui/*`.

### Workflow de Desenvolvimento

1. **Criar novo componente**: Desenvolva diretamente em `ds/src/components/ui/*`
2. **Migrar componente existente**: 
   - Copie a implementação de `src/components/ui/*` para `ds/src/components/ui/*`
   - Atualize imports para usar utilitários da lib (quando migrados)
   - Remova o facade temporário
   - Teste no Storybook

## Convenções

### Nomenclatura

- **Componentes**: PascalCase (ex: `Button.tsx`, `CardModal.tsx`)
- **Arquivos de índice**: `index.ts` (reexporta componentes do diretório)
- **Utilitários**: camelCase (ex: `utils.ts`, `helpers.ts`)

### Estrutura de Componente

```tsx
// Exemplo de estrutura de componente
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

export interface ComponentNameProps extends ComponentProps<'div'> {
  // Props específicas
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {/* Conteúdo */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Exports

- Sempre exporte tipos/interfaces junto com o componente
- Use `export type` para tipos que não são valores
- Use `export *` em `index.ts` para reexportar todos os componentes

### Imports

- Use imports absolutos quando possível (após configurar paths)
- Evite imports circulares
- Agrupe imports: React, bibliotecas externas, componentes internos, utilitários, estilos

## Testes

### Storybook

Todos os componentes devem ter stories no Storybook:

- Localização: `src/stories/` (root) ou `ds/src/stories/` (futuro)
- Nome: `ComponentName.stories.tsx`
- Incluir todas as variantes e estados do componente

### Exemplo de Story

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from '../path/to/component';

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props
  },
};
```

## Build e Type Checking

Antes de commitar:

```bash
# Verificar tipos
yarn type-check

# Build (quando necessário)
yarn build
```

## Migração de Componentes

### Checklist de Migração

- [ ] Copiar implementação para `ds/src/components/ui/*`
- [ ] Atualizar imports para usar utilitários da lib
- [ ] Remover dependências de código do app (rotas, hooks específicos, etc.)
- [ ] Adicionar/atualizar stories no Storybook
- [ ] Verificar que tipos estão corretos
- [ ] Testar no Storybook
- [ ] Remover facade temporário
- [ ] Atualizar imports no app principal (quando aplicável)

### Dependências a Migrar

Componentes podem depender de:

- `@/lib/utils` → Migrar `cn` e `filterDOMProps` para a lib
- Estilos SCSS → Migrar para a lib ou documentar como consumir
- Tokens CSS → Garantir que estão acessíveis

## Documentação

### JSDoc

Adicione JSDoc para componentes e props importantes:

```tsx
/**
 * Componente de botão com suporte a variantes e estados de loading.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Clique aqui
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'ghost';
  // ...
}
```

### README

Mantenha o `README.md` atualizado com:

- Novos componentes adicionados
- Mudanças na API
- Breaking changes (quando aplicável)

## Questões e Dúvidas

Se tiver dúvidas sobre:

- Estrutura: Consulte este documento e o `README.md`
- Convenções: Veja componentes existentes como referência
- Build: Verifique `vite.lib.config.ts` e `tsconfig.build.json`
