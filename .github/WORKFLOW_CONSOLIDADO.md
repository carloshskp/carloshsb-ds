# Workflow Consolidado: CI + Storybook Pages + Publish npm

## Visão Geral

O projeto utiliza um único workflow consolidado (`ci-pages-publish.yml`) que substitui os 3 workflows anteriores:
- `ci.yml` (CI)
- `deploy-docs.yml` (Deploy Storybook)
- `release.yml` (Publicação npm)

## Funcionamento

O workflow é executado automaticamente em cada push para a branch `master` e executa 3 jobs em sequência:

1. **build**: Executa testes, lint, build da biblioteca e build do Storybook
2. **deploy-pages**: Faz deploy do Storybook para GitHub Pages
3. **publish-npm**: Publica no npm apenas se a versão ainda não existir

## Configuração Necessária

### Secrets

- **NPM_TOKEN** (obrigatório): Token de autenticação do npm para publicação
  - Como obter: https://www.npmjs.com/settings/[seu-usuario]/tokens
  - Permissões: Read and Publish
  - Tipo: Automation ou Publish

### GitHub Pages

O workflow assume que o GitHub Pages está configurado para usar o ambiente `github-pages`. 

Para configurar:
1. Acesse Settings > Pages do repositório
2. Configure a source como "GitHub Actions"
3. O ambiente `github-pages` será criado automaticamente

## Características

- **Validação de versão**: Verifica se a versão já existe no npm antes de publicar
- **Permissões mínimas**: Usa apenas as permissões necessárias em cada job
- **Concorrência**: Evita múltiplos deploys simultâneos do GitHub Pages
- **Node 24**: Usa Node 24 fixo (conforme `engines.node` no `package.json`)
- **Yarn 4.12**: Usa Yarn 4.12.0 fixo (conforme `packageManager` no `package.json`)

## Scripts Utilizados

O workflow utiliza os seguintes scripts do `package.json`:
- `yarn test`: Executa testes
- `yarn lint`: Executa lint
- `yarn build`: Build da biblioteca
- `yarn build-storybook`: Build do Storybook

## Estrutura dos Jobs

### Job: build
- Instala dependências com Yarn (lock imutável)
- Executa testes e lint
- Faz build da biblioteca
- Faz build do Storybook
- Faz upload do artifact para GitHub Pages

### Job: deploy-pages
- Depende do job `build`
- Faz deploy do Storybook para GitHub Pages
- Requer permissões: `pages: write`, `id-token: write`

### Job: publish-npm
- Depende do job `build`
- Faz checkout e build próprio
- Verifica se a versão já existe no npm
- Publica apenas se a versão não existir
- Trata corretamente pacotes com scope (`@carloshb/ds`)

## Troubleshooting

### Workflow não executa
- Verifique se o push foi feito para a branch `master`
- Verifique se o workflow está no caminho correto: `.github/workflows/ci-pages-publish.yml`

### Falha na publicação npm
- Verifique se o secret `NPM_TOKEN` está configurado
- Verifique se o token tem permissões de Read and Publish
- Verifique se a versão no `package.json` já não existe no npm

### Falha no deploy do GitHub Pages
- Verifique se o GitHub Pages está habilitado no repositório
- Verifique se o ambiente `github-pages` está configurado
- Verifique os logs do job `deploy-pages` para erros específicos

### Build do Storybook falha
- Verifique se o script `build-storybook` está funcionando localmente
- Verifique se o diretório `storybook-static` é gerado corretamente
- Verifique os logs do job `build` para erros específicos
