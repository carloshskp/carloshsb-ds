# Guia de Publicação no npm

Este documento descreve o processo completo para publicar o Design System no npm.

## Pré-requisitos

### 1. Conta npm

- Crie uma conta em [npmjs.com](https://www.npmjs.com/) se ainda não tiver
- Configure autenticação de dois fatores (2FA) recomendado

### 2. Autenticação

```bash
# Login no npm
npm login

# Verificar se está logado
npm whoami
```

### 3. Nome do pacote

O nome atual é `ds`, que pode colidir com outros pacotes. Recomendamos usar um nome com escopo:

```bash
# Verificar se o nome está disponível
npm view @carloshb/ds

# Se retornar 404, o nome está disponível
```

**Para usar um nome com escopo:**

1. Atualize `name` no `package.json` para `@carloshb/ds` (ou outro escopo)
2. Certifique-se de que tem uma organização npm com esse escopo, ou use seu username

## Checklist Pré-Publicação

Antes de publicar, execute todos os itens:

### 1. Verificar dependências

```bash
cd ds
yarn install
```

### 2. Build

```bash
yarn build
```

Verifique se a pasta `dist/` foi gerada corretamente:
- `dist/index.js` - Bundle principal
- `dist/primitives.js` - Componentes primitivos
- `dist/terminal.js` - Componentes de terminal
- `dist/modal.js` - Componentes de modal
- `dist/types/` - Declarações TypeScript

### 3. Testes e Cobertura

```bash
# Executar testes
yarn test

# Executar com cobertura
yarn test:coverage
```

**Nota sobre cobertura durante fase de facade:**

Durante a fase inicial (facades/re-exports), os componentes reais estão em `../src/components/ui`.
O Vitest v8 tem limitações para medir cobertura de arquivos externos, então o relatório
mostrará 0% mesmo que os testes estejam exercitando o código real.

Após a migração completa dos componentes para `ds/src`, ativar os thresholds em
`vitest.config.ts` para enforçar cobertura mínima de 95% em linhas.

### 4. Verificar tipos

```bash
yarn type-check
```

### 5. Dry-run (simulação)

```bash
# Simula a publicação sem realmente publicar
npm publish --dry-run
```

### 6. Inspecionar pacote

```bash
# Gera um arquivo .tgz para inspeção
npm pack

# Lista o conteúdo do pacote
tar -tzf ds-*.tgz
```

Verifique se apenas os arquivos necessários estão incluídos:
- `dist/` (bundles e tipos)
- `README.md`
- `package.json`

**Não devem estar incluídos:**
- `src/` (código fonte)
- `node_modules/`
- `coverage/`
- Arquivos de configuração (`.ts`, `.json` de config)
- Testes (`*.test.tsx`)

## Campos Obrigatórios do package.json

Antes de publicar, certifique-se de que estes campos estão configurados:

```json
{
  "name": "@carloshb/ds",
  "version": "0.0.1",
  "description": "Design System library for carloshb.com.br projects",
  "license": "MIT",
  "author": "Carlos H. Bernardes <seu@email.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/carloshskp/v3.carloshb.com.br.git",
    "directory": "ds"
  },
  "homepage": "https://github.com/carloshskp/v3.carloshb.com.br/tree/main/ds#readme",
  "bugs": {
    "url": "https://github.com/carloshskp/v3.carloshb.com.br/issues"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## Versionamento Semântico

Use [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): Novas features, backwards compatible
- **PATCH** (0.0.x): Bug fixes, backwards compatible

### Comandos de versionamento

```bash
# Incrementa versão patch (0.0.x)
npm version patch

# Incrementa versão minor (0.x.0)
npm version minor

# Incrementa versão major (x.0.0)
npm version major

# Versão específica
npm version 1.0.0
```

**Nota**: `npm version` automaticamente:
1. Atualiza o `package.json`
2. Cria um commit git (se em um repo)
3. Cria uma tag git

## Processo de Publicação

### Publicação Manual

```bash
cd ds

# 1. Garantir que está tudo ok
yarn build
yarn test:coverage

# 2. Verificar com dry-run
npm publish --dry-run

# 3. Atualizar versão
npm version patch  # ou minor/major

# 4. Publicar
npm publish --access public  # --access public necessário para scoped packages públicos
```

### Publicação com CI/CD (GitHub Actions)

Exemplo de workflow para `.github/workflows/publish-ds.yml`:

```yaml
name: Publish DS to npm

on:
  push:
    tags:
      - 'ds-v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: yarn install --immutable
        working-directory: ds
      
      - name: Build
        run: yarn build
        working-directory: ds
      
      - name: Test with coverage
        run: yarn test:coverage
        working-directory: ds
      
      - name: Publish
        run: npm publish --access public
        working-directory: ds
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Configuração necessária:**
1. Crie um token npm em [npmjs.com](https://www.npmjs.com/) > Access Tokens
2. Adicione o token como secret `NPM_TOKEN` no GitHub

## Após Publicação

### Verificar publicação

```bash
# Ver informações do pacote
npm view @carloshb/ds

# Ver todas as versões
npm view @carloshb/ds versions
```

### Testar instalação

```bash
# Em um projeto de teste
npm install @carloshb/ds

# Ou com yarn
yarn add @carloshb/ds
```

## Rollback / Mitigação

### Deprecar versão (recomendado)

Se uma versão tem bugs, deprecie ao invés de remover:

```bash
# Marca versão como deprecated
npm deprecate @carloshb/ds@1.0.0 "Versão com bug crítico, use 1.0.1"
```

### Unpublish (último recurso)

**Atenção**: npm tem restrições para unpublish:
- Só pode fazer unpublish nas primeiras 72 horas
- Não pode fazer unpublish se outros pacotes dependem dele

```bash
# Remover versão específica
npm unpublish @carloshb/ds@1.0.0

# Remover pacote inteiro (muito raro)
npm unpublish @carloshb/ds --force
```

**Recomendação**: Prefira deprecar ao invés de unpublish.

## Boas Práticas

1. **Sempre teste localmente antes de publicar**
   ```bash
   npm pack
   # Instale o .tgz em um projeto de teste
   ```

2. **Use tags para pré-releases**
   ```bash
   npm publish --tag beta
   npm publish --tag next
   ```

3. **Mantenha um CHANGELOG**
   - Documente todas as mudanças entre versões
   - Use [Keep a Changelog](https://keepachangelog.com/)

4. **Comunique breaking changes**
   - Documente claramente no README e CHANGELOG
   - Considere um período de deprecação

5. **Monitore downloads e issues**
   - Acompanhe métricas no npm
   - Responda issues rapidamente

## Troubleshooting

### Erro: "You do not have permission to publish"

- Verifique se está logado: `npm whoami`
- Verifique se tem permissão na organização (para scoped packages)
- Verifique se o nome do pacote não está tomado

### Erro: "Package name too similar to existing package"

- npm pode bloquear nomes muito similares
- Use um nome com escopo (`@seu-username/ds`)

### Erro: "Cannot publish over existing version"

- Não é possível republicar a mesma versão
- Incremente a versão: `npm version patch`

### Cobertura abaixo de 95%

- O script `prepublishOnly` falha se a cobertura for insuficiente
- Adicione mais testes antes de publicar
- Verifique o relatório em `ds/coverage/index.html`

## Recursos Adicionais

- [npm Docs: Publishing packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [npm package.json reference](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
