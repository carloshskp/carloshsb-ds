# Arquitetura da Biblioteca

Este documento descreve a arquitetura e decisões de design da biblioteca do Design System.

## Visão Geral

A biblioteca é estruturada como um pacote npm privado que exporta componentes React, tipos TypeScript e estilos CSS. Ela é construída usando:

- **TypeScript** para type safety
- **Vite** para bundling
- **React 19** como peer dependency
- **ESM** como formato de módulo

## Estrutura de Diretórios

```
ds/
├── src/
│   ├── components/        # Componentes React
│   │   └── ui/
│   │       ├── primitives/ # Componentes primitivos (Button, Input, etc.)
│   │       ├── terminal/  # Componentes de terminal
│   │       ├── modal/     # Componentes de modal
│   │       └── side-nav.tsx
│   └── public-api/        # API pública (exports principais)
├── dist/                  # Build output
│   ├── *.js              # Módulos JavaScript (ESM)
│   └── types/             # Declarações TypeScript
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── vite.lib.config.ts
```

## Sistema de Exports

A biblioteca usa o campo `exports` do `package.json` para definir a API pública:

### Export Principal (`.`)

```tsx
import { Button, Card, Alert } from 'ds';
```

Exporta todos os componentes através de `src/public-api/index.ts`.

### Exports Específicos

```tsx
import { Button } from 'ds/primitives';
import { TerminalContainer } from 'ds/terminal';
import { CardModal } from 'ds/modal';
```

Permite tree-shaking e importações mais específicas.

### Export de Estilos

```tsx
import 'ds/styles.css';
```

(Quando estilos forem migrados)

## Build System

### TypeScript

- **Desenvolvimento** (`tsconfig.json`): Configuração para IDE e type checking
- **Build** (`tsconfig.build.json`): Gera apenas declarações de tipos (`.d.ts`)

### Vite

- **Modo Library**: Configurado em `vite.lib.config.ts`
- **Formato**: ESM apenas (moderno, tree-shakeable)
- **External**: React e React-DOM são externos (peer dependencies)
- **Entry Points**: Múltiplos (index, primitives, terminal, modal)

## Dependências

### Peer Dependencies

- `react` ^19.0.0
- `react-dom` ^19.0.0

O consumidor deve fornecer React. Isso evita duplicação e permite flexibilidade de versão.

### Dependências de Desenvolvimento

Todas as dependências de build estão no root do projeto:

- TypeScript
- Vite
- @vitejs/plugin-react
- @types/react
- @types/react-dom

## Resolução de Imports

### Durante Desenvolvimento

O Storybook resolve imports `@/components/ui/*` para:

1. `ds/src/components/ui/*` (se `ds/` existe)
2. `src/components/ui/*` (fallback)

Isso permite desenvolvimento incremental sem quebrar o Storybook.

### Após Build

O consumidor importa da biblioteca:

```tsx
import { Button } from 'ds';
```

O bundler do consumidor resolve através do campo `exports` do `package.json`.

## Facade Pattern (Temporário)

Durante a migração, os módulos em `ds/src/components/ui/*` são facades que reexportam de `src/components/ui/*`:

```tsx
// ds/src/components/ui/primitives/button.tsx
export { Button, type ButtonProps } from '../../../../src/components/ui/primitives/button';
```

**Vantagens:**
- Permite testar a estrutura sem migrar código
- Storybook funciona imediatamente
- Migração pode ser gradual

**Desvantagens:**
- Dependência circular temporária
- Não é publishável até migração completa

## Migração de Componentes

### Fase 1: Estrutura (✅ Completo)

- Criar estrutura da biblioteca
- Configurar build
- Criar facades temporários

### Fase 2: Migração de Implementações (⏳ Em andamento)

- Migrar componentes de `src/components/ui/*` para `ds/src/components/ui/*`
- Migrar utilitários necessários (`cn`, `filterDOMProps`)
- Remover facades temporários

### Fase 3: Migração de Estilos (⏳ Pendente)

- Migrar tokens CSS de `src/index.css`
- Migrar estilos SCSS de `src/styles/*.scss`
- Configurar Tailwind na lib (ou documentar consumo)

### Fase 4: Integração (⏳ Pendente)

- Atualizar imports no app principal
- Remover código duplicado
- Publicar/versionar a lib

## Type Safety

### TypeScript Strict Mode

A biblioteca usa TypeScript em modo strict:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

### Type Exports

Todos os tipos são exportados junto com os componentes:

```tsx
export { Button, type ButtonProps } from './button';
```

Isso permite type safety no consumidor.

## Tree Shaking

A estrutura de exports permite tree shaking eficiente:

- Exports específicos (`ds/primitives`) permitem importar apenas o necessário
- ESM format é otimizado para tree shaking
- Componentes são exportados individualmente

## Side Effects

CSS e SCSS são marcados como side effects no `package.json`:

```json
"sideEffects": ["**/*.css", "**/*.scss"]
```

Isso garante que estilos não sejam removidos durante tree shaking.

## Futuras Melhorias

1. **CSS-in-JS ou CSS Modules**: Considerar alternativas para estilos
2. **Storybook na lib**: Mover stories para dentro de `ds/`
3. **Testes unitários**: Adicionar Vitest/Jest
4. **CI/CD**: Automatizar build e publicação
5. **Versionamento**: Semver e changelog
