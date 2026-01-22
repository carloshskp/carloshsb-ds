# Exemplos e Receitas

Padrões comuns, receitas e exemplos práticos de uso do Design System.

## Formulários

### Formulário de Login

```tsx
import { Card, CardHeader, CardContent, CardFooter, Field, Input, Button, Alert } from '@carloshb/ds';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login
  };

  return (
    <Card>
      <CardHeader>
        <h2>Login</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="error" className="mb-4>
              {error}
            </Alert>
          )}
          
          <Field label="Email" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </Field>

          <Field label="Senha" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>

          <Button type="submit" variant="primary" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Formulário com Validação

```tsx
import { Field, Input, Button, Alert } from '@carloshb/ds';
import { useState } from 'react';

function ValidatedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (validate()) {
        // Enviar formulário
      }
    }}>
      <Field label="Nome" error={errors.name} required>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Field>

      <Field label="Email" error={errors.email} required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Field>

      <Button type="submit">Enviar</Button>
    </form>
  );
}
```

## Layouts

### Layout com Sidebar

```tsx
import { Container, SideNav, Section } from '@carloshb/ds';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideNav>
        {/* Itens de navegação */}
      </SideNav>
      <main className="flex-1">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}
```

### Dashboard

```tsx
import { Container, Card, CardHeader, CardContent, Section } from '@carloshb/ds';

function Dashboard() {
  return (
    <Container>
      <Section>
        <SectionHeader>
          <h1>Dashboard</h1>
        </SectionHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <h3>Métrica 1</h3>
            </CardHeader>
            <CardContent>
              <p>Valor: 123</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3>Métrica 2</h3>
            </CardHeader>
            <CardContent>
              <p>Valor: 456</p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
```

## Modais

### Modal de Confirmação

```tsx
import { CardModal, Button } from '@carloshb/ds';
import { useState } from 'react';

function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  title,
  message 
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) {
  return (
    <CardModal isOpen={isOpen} onClose={onClose} title={title}>
      <p>{message}</p>
      <div className="flex gap-2 mt-4">
        <Button variant="primary" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </CardModal>
  );
}
```

## Composição Avançada

### Card com Ações

```tsx
import { Card, CardHeader, CardContent, CardFooter, Button, Badge } from '@carloshb/ds';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3>{product.name}</h3>
          <Badge variant={product.inStock ? 'success' : 'error'}>
            {product.inStock ? 'Em estoque' : 'Esgotado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
        <p className="text-xl font-bold mt-2">R$ {product.price}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="primary" 
          disabled={!product.inStock}
          className="w-full"
        >
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Stepper com Formulário

```tsx
import { Stepper, StepperItem, StepperNumber, Card, CardContent, Field, Input, Button } from '@carloshb/ds';
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  return (
    <Card>
      <CardContent>
        <Stepper currentStep={step} totalSteps={totalSteps}>
          <StepperItem>
            <StepperNumber>1</StepperNumber>
            <span>Informações Pessoais</span>
          </StepperItem>
          <StepperItem>
            <StepperNumber>2</StepperNumber>
            <span>Endereço</span>
          </StepperItem>
          <StepperItem>
            <StepperNumber>3</StepperNumber>
            <span>Confirmação</span>
          </StepperItem>
        </Stepper>

        <div className="mt-8">
          {step === 1 && (
            <div>
              <Field label="Nome">
                <Input />
              </Field>
              <Button onClick={() => setStep(2)}>Próximo</Button>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <Field label="Endereço">
                <Input />
              </Field>
              <Button onClick={() => setStep(1)}>Anterior</Button>
              <Button onClick={() => setStep(3)}>Próximo</Button>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <p>Confirme suas informações</p>
              <Button onClick={() => setStep(2)}>Anterior</Button>
              <Button variant="primary">Finalizar</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

## Integrações

### Com React Router

```tsx
import { LinkButton } from '@carloshb/ds';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <nav>
      <LinkButton to="/home">Home</LinkButton>
      <LinkButton to="/about">Sobre</LinkButton>
      <Button onClick={() => navigate('/contact')}>
        Contato
      </Button>
    </nav>
  );
}
```

### Com Formik

```tsx
import { Field, Input, Button } from '@carloshb/ds';
import { Formik, Form } from 'formik';

function FormikExample() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Field label="Email">
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Field>
          <Field label="Senha">
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Field>
          <Button type="submit">Enviar</Button>
        </Form>
      )}
    </Formik>
  );
}
```

## Padrões Comuns

### Loading State

```tsx
function DataDisplay({ isLoading, data }: { isLoading: boolean; data?: Data }) {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {/* Dados */}
      </CardContent>
    </Card>
  );
}
```

### Error State

```tsx
function DataDisplay({ error, data }: { error?: Error; data?: Data }) {
  if (error) {
    return (
      <Alert variant="error" title="Erro">
        {error.message}
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        {/* Dados */}
      </CardContent>
    </Card>
  );
}
```

## Recursos Adicionais

- [Componentes](./COMPONENTS.md) - Documentação completa
- [Storybook](https://storybook.carloshb.com.br) - Mais exemplos interativos
