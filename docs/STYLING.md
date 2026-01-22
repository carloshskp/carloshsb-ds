# Guia de Estilização

Guia completo sobre estilização e customização do Design System.

## Importando Estilos

Para usar o Design System, você precisa importar os estilos CSS:

```tsx
import '@carloshb/ds/styles.css';
```

## Sistema de Estilos

O Design System usa SCSS compilado para CSS, com suporte a:

- Variáveis CSS customizáveis
- Classes utilitárias
- Responsividade mobile-first
- Suporte a temas

## Variáveis CSS

### Cores

```css
--color-primary
--color-primary-foreground
--color-secondary
--color-background
--color-foreground
--color-muted
--color-border
```

### Espaçamento

```css
--spacing-1
--spacing-2
--spacing-4
--spacing-8
/* ... */
```

### Tipografia

```css
--font-sans
--font-mono
--font-size-base
--font-weight-normal
--font-weight-bold
```

### Outras

```css
--radius-sm
--radius-md
--radius-lg
--shadow-sm
--shadow-md
--shadow-lg
```

## Customização

### Sobrescrever Variáveis

Crie um arquivo CSS com suas customizações:

```css
/* custom.css */
:root {
  --color-primary: #007bff;
  --spacing-base: 1rem;
}
```

```tsx
import '@carloshb/ds/styles.css';
import './custom.css';
```

### Classes Utilitárias

Alguns componentes expõem classes utilitárias que você pode usar:

```tsx
<div className="container-md">
  <h1 className="heading-xl">Título</h1>
</div>
```

## Responsividade

O Design System usa uma abordagem mobile-first:

```css
/* Mobile (padrão) */
.container {
  padding: var(--spacing-4);
}

/* Tablet e acima */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-8);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-12);
  }
}
```

## Theming

### Tema Claro (Padrão)

O tema claro é aplicado por padrão.

### Tema Escuro

Para suportar tema escuro, adicione o atributo `data-theme`:

```tsx
<html data-theme="dark">
  {/* Seu app */}
</html>
```

Ou via JavaScript:

```tsx
document.documentElement.setAttribute('data-theme', 'dark');
```

### Customização de Tema

```css
[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-foreground: #ffffff;
  --color-border: #333333;
}
```

## Integração com Tailwind

Se você usa Tailwind CSS, pode integrar os tokens:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      spacing: {
        'ds-4': 'var(--spacing-4)',
      },
    },
  },
}
```

## SCSS vs CSS

O Design System é compilado de SCSS para CSS. Se você quiser usar SCSS diretamente:

```scss
@import '@carloshb/ds/styles/index';

.meu-componente {
  padding: var(--spacing-4);
  color: var(--color-primary);
}
```

## Animações

### Transições

```css
.transition-fast {
  transition: all var(--duration-fast) var(--easing-default);
}

.transition-normal {
  transition: all var(--duration-normal) var(--easing-default);
}
```

### Animações Customizadas

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--duration-normal) var(--easing-default);
}
```

## Boas Práticas

1. **Use variáveis CSS**: Mantenha consistência usando tokens
2. **Evite estilos inline**: Prefira classes e variáveis
3. **Respeite o sistema de espaçamento**: Use os valores definidos
4. **Teste em diferentes temas**: Garanta compatibilidade
5. **Mobile-first**: Sempre pense mobile primeiro

## Troubleshooting

### Estilos não estão sendo aplicados

Certifique-se de que:
1. Os estilos foram importados: `import '@carloshb/ds/styles.css'`
2. A ordem de importação está correta (estilos do DS antes dos seus)
3. Não há conflitos de especificidade CSS

### Customizações não funcionam

Verifique:
1. A especificidade das suas regras CSS
2. Se está usando `:root` para variáveis globais
3. Se o tema está configurado corretamente

## Recursos Adicionais

- [Design Tokens](./DESIGN_TOKENS.md) - Sistema de tokens
- [Componentes](./COMPONENTS.md) - Documentação de componentes
- [Storybook](https://storybook.carloshb.com.br) - Explore estilos interativamente
