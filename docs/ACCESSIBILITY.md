# Guia de Acessibilidade

Padrões e práticas de acessibilidade (a11y) do Design System @carloshb/ds.

## Visão Geral

O Design System foi desenvolvido seguindo as diretrizes WCAG 2.1 (Web Content Accessibility Guidelines) nível AA, garantindo que todos os componentes sejam acessíveis para usuários com diferentes necessidades.

## Princípios de Acessibilidade

### 1. Perceptível

- Contraste de cores adequado (mínimo 4.5:1 para texto)
- Textos alternativos para imagens
- Informações não dependem apenas de cor

### 2. Operável

- Navegação por teclado
- Sem conteúdo que cause convulsões
- Tempo suficiente para interagir

### 3. Compreensível

- Texto legível e compreensível
- Funcionalidades previsíveis
- Assistência para entrada de dados

### 4. Robusto

- Compatível com tecnologias assistivas
- HTML semântico
- Atributos ARIA quando necessário

## Componentes Acessíveis

### FocusTrap

Componente para gerenciar foco em modais e overlays:

```tsx
import { FocusTrap } from '@carloshb/ds';

<FocusTrap>
  <CardModal isOpen={isOpen} onClose={onClose}>
    {/* Conteúdo do modal */}
  </CardModal>
</FocusTrap>
```

### Navegação por Teclado

Todos os componentes interativos suportam:

- **Tab**: Navegar entre elementos
- **Enter/Space**: Ativar botões e links
- **Escape**: Fechar modais e overlays
- **Arrow Keys**: Navegar em listas e menus

### Estados Visuais

Todos os componentes têm estados visuais claros:

- **Focus**: Indicador de foco visível
- **Hover**: Feedback visual ao passar o mouse
- **Active**: Estado de ativação
- **Disabled**: Estado desabilitado claramente indicado

## Atributos ARIA

Os componentes incluem atributos ARIA quando necessário:

```tsx
// Exemplo: Alert com role apropriado
<Alert variant="error" role="alert">
  Erro ao processar
</Alert>

// Exemplo: Modal com aria-labelledby
<CardModal 
  isOpen={isOpen}
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Título do Modal</h2>
</CardModal>
```

## Checklist de Acessibilidade

Ao usar os componentes, certifique-se de:

### Formulários

- [ ] Todos os campos têm labels associados
- [ ] Mensagens de erro são claras e associadas aos campos
- [ ] Campos obrigatórios estão marcados
- [ ] Validação ocorre em tempo real quando possível

### Navegação

- [ ] Todos os links são navegáveis por teclado
- [ ] Ordem de tab é lógica
- [ ] Skip links estão disponíveis quando necessário
- [ ] Foco é visível em todos os elementos interativos

### Conteúdo

- [ ] Contraste de cores é adequado
- [ ] Textos alternativos para imagens
- [ ] Estrutura semântica correta (headings, lists, etc.)
- [ ] Idioma da página está definido

### Interações

- [ ] Modais podem ser fechados com Escape
- [ ] Foco é gerenciado corretamente em modais
- [ ] Animações podem ser desabilitadas (prefers-reduced-motion)
- [ ] Timeouts são evitados ou podem ser estendidos

## Testes de Acessibilidade

### Ferramentas Recomendadas

1. **axe DevTools**: Extensão do navegador
2. **WAVE**: Avaliação web de acessibilidade
3. **Lighthouse**: Auditoria de acessibilidade
4. **Screen Readers**: NVDA, JAWS, VoiceOver

### Testes Manuais

1. **Navegação por Teclado**: Navegue todo o site apenas com teclado
2. **Screen Reader**: Teste com leitor de tela
3. **Zoom**: Verifique em 200% de zoom
4. **Contraste**: Use ferramentas de verificação de contraste

## Boas Práticas

### Semântica HTML

Use elementos HTML semânticos:

```tsx
// ✅ Bom
<button onClick={handleClick}>Clique aqui</button>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Evite
<div onClick={handleClick}>Clique aqui</div>
<div className="nav">
  <div className="item">Home</div>
</div>
```

### Labels e Descrições

Sempre forneça labels e descrições:

```tsx
// ✅ Bom
<Field label="Email" required>
  <Input type="email" aria-describedby="email-hint" />
  <span id="email-hint">Digite seu endereço de email</span>
</Field>

// ❌ Evite
<Input type="email" placeholder="Email" />
```

### Contraste de Cores

Mantenha contraste adequado:

- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos não-texto: mínimo 3:1

### Redução de Movimento

Respeite `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Recursos de acessibilidade web
- [A11y Project](https://www.a11yproject.com/) - Checklist e guias
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Suporte

Se você encontrar problemas de acessibilidade:

1. Abra uma [issue](https://github.com/carloshskp/carloshb-ds/issues)
2. Descreva o problema detalhadamente
3. Inclua passos para reproduzir
4. Mencione a tecnologia assistiva usada (se aplicável)
