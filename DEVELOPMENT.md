# Guia de Desenvolvimento - Design System

Este guia foi criado para ajudar novos desenvolvedores a se ambientarem rapidamente no projeto e seguir as boas práticas estabelecidas no Design System.

## Índice

1. [Introdução e Visão Geral](#introdução-e-visão-geral)
2. [Setup do Ambiente](#setup-do-ambiente)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Padrões de Código e Boas Práticas](#padrões-de-código-e-boas-práticas)
5. [Criando Componentes](#criando-componentes)
6. [Testes](#testes)
7. [Storybook](#storybook)
8. [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
9. [Troubleshooting](#troubleshooting)
10. [Recursos e Referências](#recursos-e-referências)

---

## Introdução e Visão Geral

### O que é o Design System?

O Design System (DS) é uma biblioteca de componentes React reutilizáveis, tokens de design e estilos padronizados para projetos carloshb.com.br. Ela garante consistência visual e de experiência em todas as aplicações.

### Status Atual

⚠️ **FASE DE MIGRAÇÃO**: A biblioteca está em fase de estruturação inicial.

- ✅ Estrutura de pacote configurada (package.json, TypeScript, Vite)
- ✅ Configuração de build e testes
- ⚠️ Os módulos em `ds/src/components/ui/*` são **facades temporários** que reexportam de `../../src/components/ui/*`
- ⚠️ **A lib ainda não é publishável** até que as implementações sejam migradas

### Documentação Relacionada

- [README.md](./README.md) - Visão geral e API da biblioteca
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura e decisões de design
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [QUICK_START.md](./QUICK_START.md) - Guia rápido de referência
- [PUBLISHING.md](./PUBLISHING.md) - Guia de publicação no npm

---

## Setup do Ambiente

### Pré-requisitos

- **Node.js**: v20+ (verificar `.nvmrc` no root do projeto)
- **Yarn**: v4.12.0+ (gerenciador de pacotes)
- **Git**: Para controle de versão
- **VS Code** (recomendado): Com extensões TypeScript e ESLint

### Instalação

```bash
# 1. Clonar o repositório (se ainda não tiver)
git clone <repo-url>
cd v3.carloshb.com.br

# 2. Instalar dependências do projeto principal
yarn install

# 3. Instalar dependências da biblioteca DS
cd ds
yarn install

# 4. Verificar instalação
yarn type-check
```

### Configuração do VS Code

Recomendamos as seguintes extensões:

- **ESLint** - Linting de código
- **Prettier** - Formatação (se configurado)
- **TypeScript** - Suporte nativo ao TypeScript
- **Error Lens** - Mostra erros inline

### Verificar Instalação

```bash
# No diretório ds/
yarn type-check  # Deve passar sem erros
yarn test        # Deve executar os testes
```

---

## Estrutura do Projeto

### Visão Geral

```
ds/
├── src/
│   ├── components/
│   │   └── ui/              # Componentes do DS
│   │       ├── primitives/  # Componentes primitivos (Button, Input, Card, etc.)
│   │       ├── terminal/   # Componentes de terminal
│   │       ├── modal/       # Componentes de modal
│   │       └── side-nav.tsx # Navegação lateral
│   ├── utils/               # Utilitários (cn, filterDOMProps)
│   ├── types/               # Tipos TypeScript compartilhados
│   ├── styles/              # Estilos CSS/SCSS (quando migrados)
│   ├── public-api/          # API pública (exports principais)
│   └── __tests__/           # Testes unitários
├── dist/                    # Build output (gerado)
├── coverage/                # Relatórios de cobertura (gerado)
├── package.json
├── tsconfig.json            # Config TypeScript para desenvolvimento
├── tsconfig.build.json       # Config TypeScript para build
├── vite.lib.config.ts       # Config Vite para build da lib
├── vitest.config.ts         # Config Vitest para testes
└── vitest.setup.ts          # Setup dos testes
```

### Diretórios Importantes

#### `src/components/ui/`

Contém todos os componentes React do Design System, organizados por categoria:

- **primitives/**: Componentes básicos reutilizáveis (Button, Input, Card, Alert, etc.)
- **terminal/**: Componentes específicos para interface de terminal
- **modal/**: Componentes de modal
- **side-nav.tsx**: Navegação lateral

#### `src/public-api/`

Ponto de entrada público da biblioteca. O arquivo `index.ts` reexporta todos os componentes que devem estar disponíveis para consumo externo.

#### `src/__tests__/`

Testes unitários e de snapshot para todos os componentes. Cada componente deve ter um arquivo de teste correspondente.

#### `src/utils/`

Utilitários compartilhados:

- `cn()`: Função para combinar classes CSS (usa `clsx` + `tailwind-merge`)
- `filterDOMProps()`: Remove props customizadas antes de passar para elementos DOM

### Facades vs Implementações Reais

**Durante a fase de migração:**

- **Facades** (`ds/src/components/ui/*`): Arquivos que apenas reexportam componentes de `../../src/components/ui/*`
- **Implementações reais**: Código fonte dos componentes em `../../src/components/ui/*`

**Após migração completa:**

- Todos os componentes estarão em `ds/src/components/ui/*`
- Os facades serão removidos
- A biblioteca será standalone

---

## Padrões de Código e Boas Práticas

### Convenções de Nomenclatura

#### Arquivos e Componentes

- **Componentes**: PascalCase (ex: `Button.tsx`, `CardModal.tsx`)
- **Arquivos de índice**: `index.ts` (reexporta componentes do diretório)
- **Utilitários**: camelCase (ex: `utils.ts`, `helpers.ts`)
- **Testes**: `ComponentName.test.tsx` ou `ComponentName.test.ts`
- **Stories**: `ComponentName.stories.tsx`

#### Variáveis e Funções

- **Componentes React**: PascalCase
- **Funções e variáveis**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Tipos e Interfaces**: PascalCase (ex: `ButtonProps`, `VariantProps`)

### Estrutura de Componentes React

#### Template Básico

```tsx
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// 1. Definir variantes com CVA
const componentVariants = cva(
  'base-classes-aqui',
  {
    variants: {
      variant: {
        default: 'classes-default',
        secondary: 'classes-secondary',
      },
      size: {
        sm: 'classes-sm',
        md: 'classes-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

// 2. Definir interface de props
export interface ComponentNameProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Props específicas do componente
  customProp?: string;
}

// 3. Implementar componente com forwardRef
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {/* Conteúdo do componente */}
      </div>
    );
  },
);

// 4. Definir displayName (importante para debugging)
ComponentName.displayName = 'ComponentName';
```

### Uso de TypeScript

#### Tipos vs Interfaces

- Use **interfaces** para props de componentes (podem ser estendidas)
- Use **types** para uniões, interseções e tipos complexos

```tsx
// ✅ Interface para props
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// ✅ Type para união
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
```

#### Extensão de Props HTML

Sempre estenda as props HTML nativas quando apropriado:

```tsx
// ✅ Correto: estende ButtonHTMLAttributes
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
}

// ✅ Correto: estende HTMLAttributes para div
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default';
}
```

### Regras do ESLint

O projeto usa ESLint com regras customizadas. Principais regras:

#### Design Tokens

**NUNCA use cores hex hardcoded**. Use design tokens ou classes Tailwind:

```tsx
// ❌ ERRADO
<div style={{ color: '#ff0000' }}>Erro</div>
<button className="bg-[#00ff00]">Botão</button>

// ✅ CORRETO
<div className="text-red-400">Erro</div>
<button className="bg-accent-emerald">Botão</button>

// ✅ CORRETO: usando CSS variables
<div style={{ color: 'var(--ds-error)' }}>Erro</div>
```

**Exceção**: Se realmente necessário, adicione comentário:

```tsx
// design-token-exception: cor específica do logo
<div style={{ color: '#ff0000' }}>Logo</div>
```

#### React Hooks

- Siga as regras do `eslint-plugin-react-hooks`
- Hooks devem ser chamados no topo do componente
- Dependências de `useEffect` devem estar completas

### Formatação de Código

O projeto usa `.editorconfig` com as seguintes configurações:

- **Indentação**: 2 espaços
- **Fim de linha**: LF (Unix)
- **Charset**: UTF-8
- **Final de arquivo**: Nova linha no final

### JSDoc e Documentação Inline

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
  
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg';
  
  /** Mostra estado de loading */
  isLoading?: boolean;
}
```

### Acessibilidade

#### ARIA e Roles

- Use `role` apropriado quando necessário
- Adicione `aria-label` para elementos sem texto visível
- Use `aria-hidden="true"` para elementos decorativos

```tsx
// ✅ Exemplo: Loading spinner
{isLoading ? (
  <>
    <span
      className="spinner"
      aria-hidden="true"
    />
    <span className="sr-only">Carregando</span>
  </>
) : (
  children
)}
```

#### Navegação por Teclado

- Componentes interativos devem ser focáveis
- Use `focus-visible:outline` para indicadores de foco
- Implemente navegação por teclado quando apropriado

```tsx
// ✅ Exemplo: Botão com foco visível
const buttonVariants = cva(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
  // ...
);
```

---

## Criando Componentes

### Passo a Passo: Criar um Novo Componente

Vamos criar um componente `Badge` como exemplo completo:

#### 1. Criar Arquivo do Componente

Criar `ds/src/components/ui/primitives/badge.tsx`:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-emerald-500 text-white',
        warning: 'bg-amber-500 text-white',
        error: 'bg-red-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Texto do badge */
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
```

#### 2. Exportar no Index

Adicionar em `ds/src/components/ui/primitives/index.ts`:

```tsx
export { Badge, type BadgeProps } from './badge';
```

#### 3. Exportar na API Pública

O arquivo `ds/src/components/ui/primitives/index.ts` já é reexportado em `ds/src/public-api/index.ts`, então o componente estará disponível automaticamente.

#### 4. Criar Testes

Criar `ds/src/__tests__/Badge.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../components/ui/primitives/badge';

describe('Badge', () => {
  it('renderiza corretamente', () => {
    render(<Badge>Novo</Badge>);
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('snapshot: variante default', () => {
    const { container } = render(<Badge>Badge</Badge>);
    expect(container).toMatchSnapshot();
  });

  it('snapshot: variante success', () => {
    const { container } = render(<Badge variant="success">Sucesso</Badge>);
    expect(container).toMatchSnapshot();
  });
});
```

#### 5. Criar Story no Storybook

Criar `src/stories/Badge.stories.tsx` (no root do projeto):

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/primitives/badge';

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Sucesso',
  },
};
```

### Template de Componente Reutilizável

Use este template como ponto de partida:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const componentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-classes',
        // Adicione mais variantes
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ComponentNameProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  /** Descrição da prop */
  customProp?: string;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {/* Implementação do componente */}
      </div>
    );
  },
);

ComponentName.displayName = 'ComponentName';
```

### Variantes com class-variance-authority

O projeto usa `class-variance-authority` (CVA) para gerenciar variantes de componentes:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Classes base (sempre aplicadas)
  'inline-flex items-center justify-center rounded-md font-semibold transition',
  {
    variants: {
      // Variante principal
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      // Outra dimensão de variante
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

// Usar no componente
export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // ...
}

// Aplicar variantes
className={cn(buttonVariants({ variant, size }), className)}
```

### Exemplo Real: Button Component

Aqui está um exemplo completo baseado no componente `Button` real:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-accent-emerald to-accent-lime text-zinc-900',
        secondary: 'border border-border-soft bg-surface-soft text-text-zinc-200',
        ghost: 'text-text-zinc-200 hover:bg-surface-soft/60',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <span className="sr-only">Carregando</span>
          </>
        ) : (
          <>
            {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
            <span>{children}</span>
            {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
```

---

## Testes

### Estrutura de Testes

O projeto usa **Vitest** com **Testing Library** para testes unitários e de snapshot.

### Configuração

- **Arquivo de config**: `vitest.config.ts`
- **Setup**: `vitest.setup.ts` (configura `@testing-library/jest-dom`)
- **Ambiente**: jsdom (simula DOM do navegador)

### Escrevendo Testes

#### Estrutura Básica

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/primitives/button';

describe('Button', () => {
  describe('Renderização', () => {
    it('renderiza corretamente com texto', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    it('chama onClick quando clicado', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

#### Testes de Snapshot

Snapshots capturam a saída renderizada do componente:

```tsx
it('snapshot: variante primary', () => {
  const { container } = render(<Button variant="primary">Primary</Button>);
  expect(container).toMatchSnapshot();
});
```

**Atualizar snapshots**: `yarn test -u`

**⚠️ Importante**: Use IDs fixos em componentes com IDs gerados dinamicamente para evitar snapshots instáveis:

```tsx
// ❌ Instável (ID gerado)
render(<Checkbox label="Opção" />);

// ✅ Estável (ID fixo)
render(<Checkbox id="test-checkbox" label="Opção" />);
```

### Testing Library Queries

Prefira queries acessíveis (por role, label, etc.):

```tsx
// ✅ Preferir
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
screen.getByText('Mensagem');

// ❌ Evitar quando possível
screen.getByTestId('submit-button');
container.querySelector('.button');
```

### Cobertura de Código

**Meta**: 95% de cobertura de linhas

```bash
# Executar testes com cobertura
yarn test:coverage

# Ver relatório HTML
open coverage/index.html
```

**Nota**: Durante a fase de facade, a cobertura pode mostrar 0% porque os componentes reais estão em `../src/components/ui`. Após migração completa, os thresholds serão ativados.

### Exemplo Completo de Teste

Baseado no teste real do `Button`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/primitives/button';

describe('Button', () => {
  describe('Renderização', () => {
    it('renderiza corretamente com texto', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renderiza como botão por padrão', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('snapshot: variante primary (padrão)', () => {
      const { container } = render(<Button>Primary Button</Button>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Tamanhos', () => {
    it('aplica tamanho sm', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });
  });

  describe('Estados', () => {
    it('pode ser disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('mostra loading state', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('Carregando')).toBeInTheDocument();
    });
  });
});
```

---

## Storybook

### O que é Storybook?

Storybook é uma ferramenta para desenvolver e documentar componentes isoladamente. Permite visualizar todas as variantes e estados de um componente.

### Criar uma Story

#### Estrutura Básica

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/primitives/button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const WithLoading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};
```

#### Organização de Stories

- **Primitives**: Componentes básicos (`Primitives/Button`, `Primitives/Card`)
- **Terminal**: Componentes de terminal (`Terminal/Container`)
- **Modal**: Modais (`Modal/CardModal`)

### Documentação de Componentes

O Storybook gera documentação automaticamente a partir de:

- **JSDoc** nos componentes e props
- **ArgTypes** customizados
- **Controls** para interação

```tsx
const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;
```

### Executar Storybook

```bash
# No root do projeto
yarn storybook
```

---

## Workflow de Desenvolvimento

### Fluxo Típico

1. **Criar branch** para a feature/componente
2. **Desenvolver** o componente seguindo os padrões
3. **Escrever testes** (unitários + snapshots)
4. **Criar story** no Storybook
5. **Verificar tipos**: `yarn type-check`
6. **Executar testes**: `yarn test`
7. **Verificar cobertura**: `yarn test:coverage`
8. **Testar no Storybook**: `yarn storybook`
9. **Commit** com mensagem descritiva

### Criar Novo Componente

```bash
# 1. Criar arquivo do componente
touch ds/src/components/ui/primitives/meu-componente.tsx

# 2. Implementar componente (usar template)

# 3. Exportar no index.ts
# Editar ds/src/components/ui/primitives/index.ts

# 4. Criar testes
touch ds/src/__tests__/MeuComponente.test.tsx

# 5. Criar story
touch src/stories/MeuComponente.stories.tsx

# 6. Verificar tudo
cd ds
yarn type-check
yarn test
cd ..
yarn storybook
```

### Migrar Componente Existente

1. **Copiar implementação** de `src/components/ui/*` para `ds/src/components/ui/*`
2. **Atualizar imports**:
   - Remover `@/` se necessário
   - Usar utilitários da lib (`cn`, `filterDOMProps`)
3. **Remover facade temporário** em `ds/src/components/ui/*`
4. **Atualizar testes** se necessário
5. **Testar no Storybook**

### Checklist Antes de Commitar

- [ ] Componente segue o template padrão
- [ ] Types/Interfaces estão corretos
- [ ] Testes passam: `yarn test`
- [ ] Cobertura adequada: `yarn test:coverage`
- [ ] Type check passa: `yarn type-check`
- [ ] Story criada e testada no Storybook
- [ ] JSDoc adicionado para props importantes
- [ ] Acessibilidade verificada (roles, aria-labels)
- [ ] Sem cores hex hardcoded (usar design tokens)
- [ ] Código formatado corretamente

### Comandos Úteis

```bash
# Desenvolvimento
cd ds
yarn type-check          # Verificar tipos TypeScript
yarn test                # Executar testes
yarn test:watch          # Testes em modo watch
yarn test:coverage       # Testes com cobertura
yarn test -u             # Atualizar snapshots
yarn build               # Build da biblioteca
yarn clean               # Limpar dist e coverage

# Storybook (no root)
yarn storybook           # Iniciar Storybook
yarn storybook:build     # Build estático do Storybook
```

---

## Troubleshooting

### Problemas Comuns

#### Erro: "Cannot find module '@/lib/utils'"

**Causa**: O alias `@/` não está configurado corretamente.

**Solução**: Verificar `vitest.config.ts` e `vite.lib.config.ts` - o alias deve apontar para `../src`.

#### Erro: "Transform failed" em testes

**Causa**: Arquivo `.test.ts` contém JSX mas tem extensão `.ts`.

**Solução**: Renomear para `.test.tsx`.

#### Snapshots falhando por IDs dinâmicos

**Causa**: Componentes geram IDs aleatórios.

**Solução**: Passar `id` fixo nas props do componente no teste.

#### Cobertura mostrando 0%

**Causa**: Durante fase de facade, componentes reais estão em `../src/components/ui`.

**Solução**: Isso é esperado. Após migração completa, a cobertura será medida corretamente.

#### Erro de tipos no build

**Causa**: Tipos não estão sendo gerados corretamente.

**Solução**: 
```bash
cd ds
yarn clean
yarn build
```

#### Storybook não encontra componentes

**Causa**: Alias `@/` não está resolvido no Storybook.

**Solução**: Verificar `.storybook/main.ts` - deve ter resolução condicional para `ds/`.

### Erros de Build

```bash
# Limpar e reconstruir
cd ds
yarn clean
rm -rf node_modules
yarn install
yarn build
```

### Problemas de Dependências

```bash
# Verificar dependências faltantes
cd ds
yarn install

# Se houver erros de peer dependencies
# Verificar package.json e adicionar como devDependency se necessário
```

---

## Recursos e Referências

### Documentação Interna

- [README.md](./README.md) - Visão geral da biblioteca
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura e decisões
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [QUICK_START.md](./QUICK_START.md) - Referência rápida
- [PUBLISHING.md](./PUBLISHING.md) - Publicação no npm

### Documentação Externa

- [React 19 Docs](https://react.dev/) - Documentação oficial do React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guia do TypeScript
- [Vitest Docs](https://vitest.dev/) - Documentação do Vitest
- [Testing Library](https://testing-library.com/) - Guia de testes
- [Storybook Docs](https://storybook.js.org/) - Documentação do Storybook
- [class-variance-authority](https://cva.style/) - Documentação do CVA
- [Tailwind CSS](https://tailwindcss.com/) - Documentação do Tailwind

### Componentes de Referência

Para entender os padrões, consulte:

- `Button` - Exemplo completo com variantes, loading, ícones
- `Alert` - Exemplo com variantes e ícones condicionais
- `Card` - Exemplo com Context API e composição
- `Stepper` - Exemplo com lógica de estado complexa

### Boas Práticas Gerais

1. **Sempre use TypeScript** - Tipos explícitos evitam bugs
2. **Teste primeiro** - TDD ajuda a pensar na API do componente
3. **Documente** - JSDoc ajuda outros desenvolvedores
4. **Acessibilidade** - Componentes devem ser usáveis por todos
5. **Design Tokens** - Nunca hardcode cores ou espaçamentos
6. **Composição** - Prefira composição sobre props complexas
7. **Performance** - Use `forwardRef` e `memo` quando apropriado

---

## Conclusão

Este guia cobre os aspectos principais do desenvolvimento no Design System. Para dúvidas específicas:

1. Consulte a documentação relacionada
2. Veja exemplos de componentes existentes
3. Verifique os testes para entender o comportamento esperado
4. Teste no Storybook para verificar visualmente

**Boa sorte no desenvolvimento! 🚀**
