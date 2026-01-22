# Design Tokens

Guia completo sobre o sistema de design tokens do @carloshb/ds.

## O que são Design Tokens?

Design Tokens são valores nomeados que representam as decisões de design. Eles são a base visual do Design System e garantem consistência em todos os projetos.

## Estrutura dos Tokens

O sistema de tokens está organizado nas seguintes categorias:

- **Cores**: Paleta de cores principal e semântica
- **Tipografia**: Fontes, tamanhos, pesos e line-heights
- **Espaçamento**: Sistema de espaçamento consistente
- **Sombras**: Elevação e profundidade
- **Bordas**: Raio de borda e estilos
- **Animações**: Durações e easings

## Cores

### Cores Primárias

As cores primárias definem a identidade visual do Design System.

```css
/* Exemplo de uso */
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

### Cores Semânticas

Cores com significado específico para diferentes contextos:

- **Success**: Operações bem-sucedidas
- **Error**: Erros e problemas
- **Warning**: Avisos e alertas
- **Info**: Informações gerais

### Cores Neutras

Escala de cinzas para textos, fundos e bordas.

## Tipografia

### Família de Fontes

```css
--font-sans: /* Fonte sans-serif padrão */
--font-mono: /* Fonte monoespaçada */
```

### Tamanhos

Sistema de escala tipográfica:

- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)

### Pesos

- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Espaçamento

Sistema de espaçamento baseado em múltiplos de 4px:

- `0`: 0
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)
- `20`: 5rem (80px)
- `24`: 6rem (96px)

## Sombras

Sistema de elevação através de sombras:

```css
--shadow-sm: /* Sombra pequena */
--shadow-md: /* Sombra média */
--shadow-lg: /* Sombra grande */
--shadow-xl: /* Sombra extra grande */
```

## Bordas

### Raio de Borda

- `none`: 0
- `sm`: 0.125rem (2px)
- `md`: 0.25rem (4px)
- `lg`: 0.5rem (8px)
- `xl`: 0.75rem (12px)
- `full`: 9999px (totalmente arredondado)

## Animações

### Durações

- `fast`: 150ms
- `normal`: 200ms
- `slow`: 300ms

### Easings

- `ease-in`: Aceleração
- `ease-out`: Desaceleração
- `ease-in-out`: Aceleração e desaceleração

## Como Usar Tokens

### Em Componentes React

Os tokens são aplicados automaticamente nos componentes. Para customização, você pode sobrescrever as variáveis CSS:

```tsx
import '@carloshb/ds/styles.css';

// Customização global
:root {
  --color-primary: #your-color;
}
```

### Em CSS/SCSS

```css
.meu-componente {
  color: var(--color-text-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

## Customização de Tokens

### Sobrescrever Tokens Globais

Crie um arquivo CSS com suas customizações:

```css
/* custom-tokens.css */
:root {
  --color-primary: #007bff;
  --color-primary-foreground: #ffffff;
  --spacing-base: 1rem;
  --font-sans: 'Inter', sans-serif;
}
```

Importe após os estilos do Design System:

```tsx
import '@carloshb/ds/styles.css';
import './custom-tokens.css';
```

### Theming

O Design System suporta temas customizados através de variáveis CSS:

```css
[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
}

[data-theme="light"] {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
}
```

## Tokens Disponíveis

Para ver todos os tokens disponíveis, consulte:
- [Storybook - Design Tokens](https://storybook.carloshb.com.br)
- Arquivo de tokens: `src/tokens/index.ts`

## Boas Práticas

1. **Use tokens ao invés de valores hardcoded**: Mantenha consistência
2. **Não crie novos tokens sem necessidade**: Reutilize os existentes
3. **Documente tokens customizados**: Se criar novos, documente o uso
4. **Teste em diferentes temas**: Garanta que funcionam em todos os temas

## Recursos Adicionais

- [Estilização](./STYLING.md) - Guia completo de estilos
- [Theming no Storybook](https://storybook.carloshb.com.br) - Explore tokens interativamente
