# Configuração de Secrets e Variables do GitHub Actions

Este documento descreve como configurar os Secrets e Variables necessários para os workflows de CI/CD.

## Como Configurar

1. Acesse as configurações do repositório: `https://github.com/[usuario]/[repositorio]/settings/secrets/actions`
2. Configure os Secrets na aba "Secrets"
3. Configure as Variables na aba "Variables"

## Secrets (Configurações Sensíveis)

### NPM_TOKEN

- **Descrição**: Token de autenticação do npm para publicação de pacotes
- **Como obter**:
  1. Acesse https://www.npmjs.com/settings/[seu-usuario]/tokens
  2. Clique em "Generate New Token"
  3. Selecione "Automation" ou "Publish" como tipo
  4. Copie o token gerado
- **Permissões necessárias**: Read and Publish
- **Onde usar**: Workflow `release.yml`

## Variables (Configurações Não-Sensíveis)

### NODE_VERSION

- **Descrição**: Versão do Node.js a ser usada nos workflows
- **Valor padrão**: `20.x`
- **Onde usar**: Todos os workflows

### NPM_REGISTRY_URL

- **Descrição**: URL do registry npm
- **Valor padrão**: `https://registry.npmjs.org`
- **Onde usar**: Workflow `release.yml`

### NPM_PACKAGE_SCOPE

- **Descrição**: Escopo do pacote npm (ex: `@carloshb`)
- **Valor padrão**: `@carloshb`
- **Onde usar**: Referência (não usado diretamente nos workflows)

### NPM_DEFAULT_TAG

- **Descrição**: Tag padrão do npm para releases estáveis
- **Valor padrão**: `latest`
- **Onde usar**: Workflow `release.yml`

### NPM_BETA_TAG

- **Descrição**: Tag do npm para versões beta
- **Valor padrão**: `beta`
- **Onde usar**: Workflow `release.yml`

### NPM_NEXT_TAG

- **Descrição**: Tag do npm para versões experimental
- **Valor padrão**: `next`
- **Onde usar**: Workflow `release.yml`

### GIT_TAG_PREFIX

- **Descrição**: Prefixo para tags git (ex: `v` para `v1.0.0` ou vazio para `1.0.0`)
- **Valor padrão**: `v`
- **Onde usar**: Workflow `release.yml`

### AUTO_PUSH_GIT_TAGS

- **Descrição**: Habilitar push automático de tags git após publicação
- **Valor padrão**: `true`
- **Valores aceitos**: `true` ou `false`
- **Onde usar**: Workflow `release.yml`

### BASE_BRANCH

- **Descrição**: Branch principal do repositório
- **Valor padrão**: `main`
- **Onde usar**: Todos os workflows

### ENABLE_COVERAGE

- **Descrição**: Habilitar geração de coverage nos testes
- **Valor padrão**: `true`
- **Valores aceitos**: `true` ou `false`
- **Onde usar**: Workflow `ci.yml`

### STORYBOOK_PORT

- **Descrição**: Porta do Storybook para desenvolvimento
- **Valor padrão**: `6006`
- **Onde usar**: Referência (não usado diretamente nos workflows)

## Valores Padrão

Todos os workflows têm fallbacks para valores padrão caso as variables não estejam definidas. No entanto, é recomendado configurar todas as variables para ter controle total sobre o comportamento dos workflows.

## Exemplo de Configuração Completa

### Secrets
- `NPM_TOKEN`: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Variables
- `NODE_VERSION`: `20.x`
- `NPM_REGISTRY_URL`: `https://registry.npmjs.org`
- `NPM_PACKAGE_SCOPE`: `@carloshb`
- `NPM_DEFAULT_TAG`: `latest`
- `NPM_BETA_TAG`: `beta`
- `NPM_NEXT_TAG`: `next`
- `GIT_TAG_PREFIX`: `v`
- `AUTO_PUSH_GIT_TAGS`: `true`
- `BASE_BRANCH`: `main`
- `ENABLE_COVERAGE`: `true`
- `STORYBOOK_PORT`: `6006`

## Notas Importantes

1. **Secrets são criptografados** e não podem ser visualizados depois de criados
2. **Variables podem ser alteradas** a qualquer momento sem modificar código
3. **Variables podem ser definidas** no nível do repositório ou da organização
4. **Secrets são sempre** no nível do repositório ou da organização
5. Os workflows usam fallbacks, mas é recomendado configurar todas as variables

## Troubleshooting

Se os workflows falharem:

1. Verifique se todos os Secrets necessários estão configurados
2. Verifique se as Variables têm os valores corretos
3. Verifique os logs do workflow para mensagens de erro específicas
4. Certifique-se de que o `NPM_TOKEN` tem as permissões corretas (Read and Publish)
