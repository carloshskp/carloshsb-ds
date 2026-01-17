# Design System Library

Biblioteca do Design System para projetos carloshb.com.br. Esta biblioteca contém componentes React reutilizáveis, tokens de design e estilos padronizados.

## Status Atual

✅ **MIGRAÇÃO COMPLETA**: A biblioteca está pronta para uso!

- ✅ Estrutura de pacote configurada (package.json, TypeScript, Vite)
- ✅ Configuração de build e testes completa
- ✅ Todos os componentes migrados de `src/components/ui/*` para `ds/src/components/ui/*`
- ✅ Utilitários (`cn`, `filterDOMProps`) migrados para a biblioteca
- ✅ 152 testes passando com cobertura de código
- ✅ Imports atualizados na aplicação principal e Storybook
- ⚠️ A lib ainda está no `.gitignore` (remover quando pronto para versionamento)

## Estrutura

```
ds/
├── src/
│   ├── components/
│   │   └── ui/              # Componentes do DS
│   │       ├── primitives/  # Componentes primitivos (Button, Input, Card, etc.)
│   │       ├── terminal/   # Componentes de terminal
│   │       ├── modal/       # Componentes de modal (CardModal)
│   │       └── side-nav.tsx # Navegação lateral
│   ├── utils/               # Utilitários (cn, filterDOMProps)
│   ├── types/               # Tipos TypeScript
│   ├── styles/              # Estilos (placeholder)
│   ├── public-api/          # API pública (exports principais)
│   └── __tests__/           # Testes unitários (152 testes)
├── dist/                    # Build output (gerado)
├── coverage/                # Relatórios de cobertura
├── package.json
├── tsconfig.json            # Config TypeScript para desenvolvimento
├── tsconfig.build.json       # Config TypeScript para build (declarações)
├── vite.lib.config.ts       # Config Vite para build da lib
├── vitest.config.ts         # Config Vitest para testes
└── vitest.setup.ts          # Setup dos testes
```

## Instalação e Uso

### Desenvolvimento Local

A biblioteca já está sendo consumida pela aplicação principal através de imports relativos:

```tsx
// Em src/App.tsx ou src/stories/*.stories.tsx
import { Button } from '@ds/components/ui/primitives';
import { TerminalBody } from '../ds/src/components/ui/terminal';
import { SideNav } from '@ds/components/ui/side-nav';
```

### Uso Futuro (Após Publicação)

Quando publicada no npm, os imports serão:

```tsx
// Importação principal
import { Button, Card, Alert } from 'ds';

// Importação por categoria
import { Button } from 'ds/primitives';
import { TerminalContainer } from 'ds/terminal';
import { CardModal } from 'ds/modal';
```

## API Pública (Exports)

A biblioteca exporta os seguintes módulos através do campo `exports` no `package.json`:

| Export | Descrição | Exemplo |
|--------|-----------|---------|
| `.` | Export principal (todos os componentes) | `import { Button } from 'ds'` |
| `./primitives` | Componentes primitivos | `import { Button } from 'ds/primitives'` |
| `./terminal` | Componentes de terminal | `import { TerminalContainer } from 'ds/terminal'` |
| `./modal` | Componentes de modal | `import { CardModal } from 'ds/modal'` |
| `./styles.css` | Estilos do Design System | `import 'ds/styles.css'` |

## Componentes Disponíveis

### Primitives (14 componentes)

- **Button** - Botão com variantes (primary, secondary, ghost, outlined, destructive)
- **Input** - Campo de entrada de texto
- **Textarea** - Área de texto multilinha
- **Checkbox** - Caixa de seleção
- **Radio** - Botão de opção
- **Field** - Campo de formulário com label e validação
- **Card** - Card com header, content e footer
- **Alert** - Alerta com variantes (error, success, warning, info)
- **Badge** - Badge para tags e labels
- **Container** - Container responsivo
- **LinkButton** - Botão estilizado como link
- **Section** - Seção com header e content
- **Stepper** - Indicador de progresso em etapas
- **Text** - Componentes de texto (Heading, Paragraph, Label, Text)

### Terminal (5 componentes)

- **TerminalContainer** - Container principal do terminal
- **TerminalHeader** - Cabeçalho do terminal
- **TerminalBody** - Corpo do terminal
- **TerminalControls** - Controles do terminal
- **TypeWriter** - Efeito de digitação

### Modal (1 componente)

- **CardModal** - Modal estilizado como card

### Navigation (1 componente)

- **SideNav** - Navegação lateral

## Scripts Disponíveis

```bash
# Testes
yarn test              # Executar testes
yarn test:watch        # Testes em modo watch
yarn test:coverage     # Testes com cobertura (152 testes, passando)

# Build e Type Checking
yarn build             # Build da biblioteca (gera dist/ e tipos)
yarn type-check        # Verificação de tipos sem emitir arquivos
yarn clean             # Limpar pasta dist/ e coverage/
```

## Requisitos

### Peer Dependencies

A biblioteca requer as seguintes dependências no projeto consumidor:

- `react` >= 19.0.0
- `react-dom` >= 19.0.0
- `react-router-dom` >= 7.0.0 (opcional)

### Dependencies

Dependências internas da biblioteca:

- `class-variance-authority` ^0.7.0
- `clsx` ^2.1.1
- `lucide-react` ^0.555.0
- `tailwind-merge` ^3.4.0

## Build

O build da biblioteca gera:

1. **JavaScript (ESM)**: `dist/*.js` - Módulos ES para consumo
2. **TypeScript Declarations**: `dist/types/**/*.d.ts` - Definições de tipos
3. **CSS** (futuro): `dist/styles.css` - Estilos do Design System

### Processo de Build

1. TypeScript compila declarações de tipos (`tsc -p tsconfig.build.json`)
2. Vite faz o bundle dos módulos (`vite build --config vite.lib.config.ts`)

## Desenvolvimento

### Integração com Aplicação Principal

A aplicação principal (`src/App.tsx`) e o Storybook (`src/stories/**/*.stories.tsx`) já estão configurados para usar a biblioteca através de imports relativos:

```tsx
// Exemplo de import no App.tsx
import { TerminalBody, TerminalControls } from '../ds/src/components/ui/terminal';
import { Heading } from '../ds/src/components/ui/primitives/text';
import { SideNav } from '@ds/components/ui/side-nav';
```

### Status da Migração

✅ **COMPLETA** - Todos os componentes reutilizáveis foram migrados:

1. ✅ Utilitários (`cn`, `filterDOMProps`) migrados para `ds/src/utils/`
2. ✅ Todos os 14 componentes primitives migrados
3. ✅ Todos os 5 componentes de terminal migrados
4. ✅ CardModal migrado
5. ✅ SideNav migrado
6. ✅ Imports atualizados em `src/App.tsx` e `src/stories/**/*.stories.tsx`
7. ✅ 152 testes passando
8. ✅ Type checking funcional

## Componentes Específicos da Aplicação (Não Migrados)

Os seguintes componentes permanecem em `src/components/ui/` por serem específicos da aplicação principal:

- `animated-cube.tsx` - Animação específica do hero
- `profile-image.tsx` - Usa assets específicos da aplicação
- `pattern-overlay.tsx` - Efeito visual específico

## Próximos Passos

1. ✅ ~~Estrutura da biblioteca criada~~
2. ✅ ~~Configuração de build preparada~~
3. ✅ ~~Storybook configurado para consumir a lib~~
4. ✅ ~~Migrar implementações de `src/components/ui/*` para `ds/src/components/ui/*`~~
5. ✅ ~~Migrar utilitários necessários (`cn`, `filterDOMProps`)~~
6. ✅ ~~Atualizar imports no projeto principal~~
7. ✅ ~~Remover `ds/` do `.gitignore` quando pronto para versionamento~~
8. ⏳ Migrar estilos SCSS para a lib (se necessário)
9. ⏳ Configurar publicação no npm (opcional)

## Notas Importantes

- A pasta `ds/` foi removida do `.gitignore` e está pronta para versionamento
- Os componentes agora são independentes do app principal
- CardModal ainda depende de `FocusTrap` do app principal (componente de acessibilidade)
- Os estilos ainda estão em `src/index.css` e `src/styles/*.scss`
- O Tailwind config ainda está no root - funciona para ambos

## Testes

A biblioteca possui 152 testes unitários e de snapshot cobrindo todos os componentes:

```bash
Test Files  11 passed (11)
     Tests  152 passed (152)
```

Arquivos de teste:
- `Button.test.tsx` (25 testes)
- `Text.test.tsx` (20 testes)
- `FormControls.test.tsx` (19 testes)
- `Card.test.tsx` (14 testes)
- `Alert.test.tsx` (14 testes)
- E mais 6 arquivos de teste

## Documentação

Para mais informações sobre desenvolvimento, contribuição e uso da biblioteca:

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia completo de desenvolvimento para novos desenvolvedores
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura e decisões de design
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição
- **[QUICK_START.md](./QUICK_START.md)** - Referência rápida
- **[PUBLISHING.md](./PUBLISHING.md)** - Guia de publicação no npm

## Contribuindo

A biblioteca está pronta para receber contribuições! Para adicionar novos componentes ou melhorar existentes:

1. Desenvolva novos componentes em `ds/src/components/ui/*`
2. Adicione testes em `ds/src/__tests__/`
3. Atualize exports em `ds/src/components/ui/*/index.ts`
4. Verifique tipos: `yarn type-check`
5. Execute testes: `yarn test`
6. Crie stories no Storybook

Consulte [DEVELOPMENT.md](./DEVELOPMENT.md) para guia completo.
