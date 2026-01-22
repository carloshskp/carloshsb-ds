# Guia de Componentes

Documentação completa de todos os componentes do Design System @carloshb/ds.

## Índice

- [Componentes Primitivos](#componentes-primitivos)
  - [Button](#button)
  - [Card](#card)
  - [Alert](#alert)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Field](#field)
  - [Badge](#badge)
  - [Container](#container)
  - [LinkButton](#linkbutton)
  - [Section](#section)
  - [Stepper](#stepper)
  - [Text](#text)
- [Componentes de Terminal](#componentes-de-terminal)
- [Componentes de Modal](#componentes-de-modal)
- [Componentes de Navegação](#componentes-de-navegação)
- [Componentes de Acessibilidade](#componentes-de-acessibilidade)

## Componentes Primitivos

### Button

Botão com múltiplas variantes e estados.

#### Importação

```tsx
import { Button } from '@carloshb/ds';
// ou
import { Button } from '@carloshb/ds/primitives';
```

#### Props

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outlined' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}
```

#### Variantes

- **primary** (padrão): Botão principal com fundo sólido
- **secondary**: Botão secundário
- **ghost**: Botão sem fundo, apenas texto
- **outlined**: Botão com borda
- **destructive**: Botão para ações destrutivas (ex: deletar)

#### Exemplos

```tsx
// Botão básico
<Button>Clique aqui</Button>

// Variantes
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="destructive">Deletar</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>

// Estado de loading
<Button loading>Carregando...</Button>

// Desabilitado
<Button disabled>Desabilitado</Button>
```

#### Acessibilidade

- Suporta navegação por teclado (Tab, Enter, Space)
- Atributos ARIA automáticos
- Estados visuais claros para foco e desabilitado

**Storybook**: [Button Stories](https://storybook.carloshb.com.br)

---

### Card

Container com header, content e footer opcionais.

#### Importação

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@carloshb/ds';
```

#### Props

```tsx
interface CardProps {
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

type CardContentProps = HTMLAttributes<HTMLDivElement>;
type CardFooterProps = HTMLAttributes<HTMLDivElement>;
```

#### Exemplos

```tsx
// Card básico
<Card>
  <CardContent>Conteúdo do card</CardContent>
</Card>

// Card completo
<Card>
  <CardHeader>
    <h2>Título do Card</h2>
  </CardHeader>
  <CardContent>
    <p>Conteúdo principal do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>

// Variantes
<Card variant="default">Default</Card>
<Card variant="ghost">Ghost</Card>
<Card variant="outline">Outline</Card>
```

**Storybook**: [Card Stories](https://storybook.carloshb.com.br)

---

### Alert

Componente de alerta para exibir mensagens importantes.

#### Importação

```tsx
import { Alert } from '@carloshb/ds';
```

#### Props

```tsx
interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
```

#### Variantes

- **error**: Para erros e problemas críticos
- **success**: Para confirmações e sucessos
- **warning**: Para avisos e alertas
- **info**: Para informações gerais

#### Exemplos

```tsx
<Alert variant="success">Operação realizada com sucesso!</Alert>

<Alert variant="error" title="Erro">
  Ocorreu um erro ao processar sua solicitação.
</Alert>

<Alert variant="warning" title="Atenção">
  Esta ação não pode ser desfeita.
</Alert>

<Alert variant="info" title="Informação">
  Novos recursos disponíveis em breve.
</Alert>
```

**Storybook**: [Alert Stories](https://storybook.carloshb.com.br)

---

### Input

Campo de entrada de texto.

#### Importação

```tsx
import { Input } from '@carloshb/ds';
```

#### Props

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Herda todas as props padrão de input HTML
}
```

#### Exemplos

```tsx
<Input type="text" placeholder="Digite seu nome" />
<Input type="email" placeholder="seu@email.com" />
<Input type="password" placeholder="Senha" />
<Input type="number" min={0} max={100} />
<Input disabled value="Valor desabilitado" />
```

**Storybook**: [Input Stories](https://storybook.carloshb.com.br)

---

### Textarea

Área de texto multilinha.

#### Importação

```tsx
import { Textarea } from '@carloshb/ds';
```

#### Props

```tsx
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Herda todas as props padrão de textarea HTML
}
```

#### Exemplos

```tsx
<Textarea placeholder="Digite sua mensagem" rows={4} />

<Textarea 
  placeholder="Comentário" 
  rows={6}
  maxLength={500}
/>
```

**Storybook**: [Textarea Stories](https://storybook.carloshb.com.br)

---

### Checkbox

Caixa de seleção.

#### Importação

```tsx
import { Checkbox } from '@carloshb/ds';
```

#### Props

```tsx
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}
```

#### Exemplos

```tsx
<Checkbox label="Aceito os termos" />

<Checkbox 
  label="Receber notificações" 
  defaultChecked 
/>

// Sem label
<Checkbox id="custom" />
<Label htmlFor="custom">Label customizado</Label>
```

**Storybook**: [Checkbox Stories](https://storybook.carloshb.com.br)

---

### Radio

Botão de opção.

#### Importação

```tsx
import { Radio } from '@carloshb/ds';
```

#### Props

```tsx
interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}
```

#### Exemplos

```tsx
<Radio name="option" value="1" label="Opção 1" />
<Radio name="option" value="2" label="Opção 2" />
<Radio name="option" value="3" label="Opção 3" />
```

**Storybook**: [Radio Stories](https://storybook.carloshb.com.br)

---

### Field

Campo de formulário com label e validação.

#### Importação

```tsx
import { Field } from '@carloshb/ds';
```

#### Props

```tsx
interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

#### Exemplos

```tsx
<Field label="Email" required>
  <Input type="email" />
</Field>

<Field label="Senha" error="Senha muito curta">
  <Input type="password" />
</Field>

<Field label="Comentário" hint="Máximo de 500 caracteres">
  <Textarea rows={4} />
</Field>
```

**Storybook**: [Field Stories](https://storybook.carloshb.com.br)

---

### Badge

Badge para tags e labels.

#### Importação

```tsx
import { Badge } from '@carloshb/ds';
```

#### Props

```tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

#### Exemplos

```tsx
<Badge>Novo</Badge>
<Badge variant="success">Ativo</Badge>
<Badge variant="error">Erro</Badge>
<Badge variant="warning">Atenção</Badge>
<Badge variant="info">Info</Badge>
```

**Storybook**: [Badge Stories](https://storybook.carloshb.com.br)

---

### Container

Container responsivo.

#### Importação

```tsx
import { Container } from '@carloshb/ds';
```

#### Props

```tsx
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children: React.ReactNode;
}
```

#### Exemplos

```tsx
<Container size="md">
  <h1>Conteúdo centralizado</h1>
</Container>
```

**Storybook**: [Container Stories](https://storybook.carloshb.com.br)

---

### LinkButton

Botão estilizado como link.

#### Importação

```tsx
import { LinkButton, ExternalLinkButton } from '@carloshb/ds';
```

#### Exemplos

```tsx
<LinkButton to="/sobre">Sobre</LinkButton>
<ExternalLinkButton href="https://example.com">Site externo</ExternalLinkButton>
```

**Storybook**: [LinkButton Stories](https://storybook.carloshb.com.br)

---

### Section

Seção com header e content.

#### Importação

```tsx
import { Section, SectionHeader } from '@carloshb/ds';
```

#### Exemplos

```tsx
<Section>
  <SectionHeader>
    <h2>Título da Seção</h2>
  </SectionHeader>
  <p>Conteúdo da seção</p>
</Section>
```

**Storybook**: [Section Stories](https://storybook.carloshb.com.br)

---

### Stepper

Indicador de progresso em etapas.

#### Importação

```tsx
import { Stepper, StepperItem, StepperNumber, StepperLine } from '@carloshb/ds';
```

#### Exemplos

```tsx
<Stepper currentStep={2} totalSteps={4}>
  <StepperItem>
    <StepperNumber>1</StepperNumber>
    <StepperLine />
    <span>Etapa 1</span>
  </StepperItem>
  <StepperItem>
    <StepperNumber>2</StepperNumber>
    <StepperLine />
    <span>Etapa 2</span>
  </StepperItem>
</Stepper>
```

**Storybook**: [Stepper Stories](https://storybook.carloshb.com.br)

---

### Text

Componentes de texto tipográficos.

#### Importação

```tsx
import { Heading, Paragraph, Label, Text } from '@carloshb/ds';
```

#### Exemplos

```tsx
<Heading level={1} size="2xl">Título Principal</Heading>
<Heading level={2} size="xl">Subtítulo</Heading>

<Paragraph size="lg">Parágrafo grande</Paragraph>
<Paragraph variant="muted">Texto secundário</Paragraph>

<Label size="sm" required>Campo obrigatório</Label>

<Text variant="accent">Texto destacado</Text>
<Text variant="destructive">Texto de erro</Text>
```

**Storybook**: [Text Stories](https://storybook.carloshb.com.br)

---

## Componentes de Terminal

### TerminalContainer

Container principal do terminal.

#### Importação

```tsx
import { TerminalContainer } from '@carloshb/ds/terminal';
```

#### Exemplos

```tsx
<TerminalContainer>
  <TerminalHeader />
  <TerminalBody>
    {/* Conteúdo do terminal */}
  </TerminalBody>
</TerminalContainer>
```

**Storybook**: [Terminal Stories](https://storybook.carloshb.com.br)

---

## Componentes de Modal

### CardModal

Modal estilizado como card.

#### Importação

```tsx
import { CardModal } from '@carloshb/ds/modal';
```

#### Props

```tsx
interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
```

#### Exemplos

```tsx
const [isOpen, setIsOpen] = useState(false);

<CardModal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirmar ação"
>
  <p>Tem certeza que deseja continuar?</p>
  <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
</CardModal>
```

**Storybook**: [CardModal Stories](https://storybook.carloshb.com.br)

---

## Componentes de Navegação

### SideNav

Navegação lateral.

#### Importação

```tsx
import { SideNav } from '@carloshb/ds';
```

**Storybook**: [SideNav Stories](https://storybook.carloshb.com.br)

---

## Componentes de Acessibilidade

### FocusTrap

Componente para gerenciar foco em modais e overlays.

#### Importação

```tsx
import { FocusTrap } from '@carloshb/ds';
```

#### Exemplos

```tsx
<FocusTrap>
  <CardModal isOpen={isOpen} onClose={onClose}>
    {/* Conteúdo do modal */}
  </CardModal>
</FocusTrap>
```

**Storybook**: [FocusTrap Stories](https://storybook.carloshb.com.br)

---

## Boas Práticas

### Composição de Componentes

Os componentes foram projetados para serem compostos:

```tsx
<Card>
  <CardHeader>
    <Heading level={2}>Título</Heading>
  </CardHeader>
  <CardContent>
    <Field label="Campo">
      <Input />
    </Field>
  </CardContent>
  <CardFooter>
    <Button>Salvar</Button>
  </CardFooter>
</Card>
```

### Customização

Todos os componentes aceitam `className` para customização adicional:

```tsx
<Button className="minha-classe-customizada">Botão</Button>
```

### Acessibilidade

Todos os componentes seguem as melhores práticas de acessibilidade:
- Suporte a navegação por teclado
- Atributos ARIA quando necessário
- Estados visuais claros
- Suporte a leitores de tela

Para mais detalhes, consulte o [Guia de Acessibilidade](./ACCESSIBILITY.md).

## Recursos Adicionais

- [Design Tokens](./DESIGN_TOKENS.md) - Customização visual
- [Estilização](./STYLING.md) - Guia de estilos
- [Exemplos](./EXAMPLES.md) - Padrões e receitas
- [Storybook](https://storybook.carloshb.com.br) - Documentação interativa
