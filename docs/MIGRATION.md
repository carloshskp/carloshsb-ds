# Guia de Migração

Guia para migrar entre versões do Design System @carloshb/ds.

## Processo de Migração

1. **Leia o Changelog**: Verifique as mudanças na [página de releases](https://github.com/carloshskp/carloshb-ds/releases)
2. **Atualize a versão**: `npm install @carloshb/ds@latest`
3. **Execute testes**: Certifique-se de que tudo funciona
4. **Atualize código**: Siga os guias abaixo para breaking changes

## Breaking Changes por Versão

### v1.0.0 (Futuro)

Quando a versão 1.0.0 for lançada, este guia será atualizado com os breaking changes.

## Checklist de Migração

### Antes de Atualizar

- [ ] Backup do código atual
- [ ] Testes passando na versão atual
- [ ] Documentação da versão atual lida

### Durante a Atualização

- [ ] Atualizar dependência
- [ ] Resolver conflitos de dependências
- [ ] Atualizar imports se necessário
- [ ] Atualizar props se necessário
- [ ] Atualizar estilos se necessário

### Após Atualizar

- [ ] Executar testes
- [ ] Verificar visualmente
- [ ] Testar em diferentes navegadores
- [ ] Verificar acessibilidade
- [ ] Atualizar documentação do projeto

## Exemplos de Migração

### Migração de Props

Se uma prop foi renomeada:

```tsx
// Versão antiga
<Button type="primary">Clique</Button>

// Versão nova
<Button variant="primary">Clique</Button>
```

### Migração de Imports

Se a estrutura de exports mudou:

```tsx
// Versão antiga
import { Button } from '@carloshb/ds/components';

// Versão nova
import { Button } from '@carloshb/ds/primitives';
```

### Migração de Estilos

Se classes CSS mudaram:

```css
/* Versão antiga */
.btn-primary { }

/* Versão nova */
.button-primary { }
```

## Suporte

Se você encontrar problemas durante a migração:

1. Consulte a [documentação](./README.md)
2. Verifique [issues conhecidas](https://github.com/carloshskp/carloshb-ds/issues)
3. Abra uma [nova issue](https://github.com/carloshskp/carloshb-ds/issues/new) se necessário

## Versões Suportadas

Atualmente suportamos apenas a versão mais recente. Versões antigas não recebem atualizações de segurança ou correções.

## Recursos Adicionais

- [Changelog](https://github.com/carloshskp/carloshb-ds/releases)
- [Componentes](./COMPONENTS.md) - Referência de API atualizada
