import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '@/components/ui/primitives/container';
import { Heading, Paragraph } from '@/components/ui/primitives/text';
import { Button } from '@/components/ui/primitives/button';
import { CheckCircle2 } from 'lucide-react';

const meta = {
  title: 'Primitives/Container',
  component: Container,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container com efeito glassmorphism e borda gradiente opcional. Usado como wrapper principal para seções e formulários.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success'],
      description: 'Variante visual do container',
    },
    withGradient: {
      control: 'boolean',
      description: 'Adiciona linha gradiente no topo',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Container padrão com glassmorphism
 */
export const Default: Story = {
  args: {
    variant: 'default',
    withGradient: true,
  },
  render: (args) => (
    <Container {...args} className="w-96">
      <Heading as="h2" size="2xl" className="mb-4">Título da Seção</Heading>
      <Paragraph variant="muted" className="mb-6">
        Este é um container padrão com efeito glassmorphism e linha gradiente no topo.
      </Paragraph>
      <Button>Ação Principal</Button>
    </Container>
  ),
};

/**
 * Container de sucesso para mensagens de confirmação
 */
export const Success: Story = {
  args: {
    variant: 'success',
    withGradient: true,
  },
  render: (args) => (
    <Container {...args} className="w-96">
      <CheckCircle2 className="w-20 h-20 text-green-400 mb-6 mx-auto" aria-hidden="true" />
      <Heading as="h2" size="3xl" className="mb-4">Mensagem Enviada!</Heading>
      <Paragraph className="mb-8">
        Obrigado pelo contato. Retornarei em breve.
      </Paragraph>
      <Button>Voltar para Sobre</Button>
    </Container>
  ),
};

/**
 * Container sem gradiente no topo
 */
export const NoGradient: Story = {
  args: {
    variant: 'default',
    withGradient: false,
  },
  render: (args) => (
    <Container {...args} className="w-96">
      <Heading as="h2" size="2xl" className="mb-4">Container Simples</Heading>
      <Paragraph variant="muted">
        Container sem a linha gradiente decorativa no topo.
      </Paragraph>
    </Container>
  ),
};

/**
 * Container como formulário
 */
export const FormContainer: Story = {
  render: () => (
    <Container className="w-full max-w-lg">
      <Heading as="h2" size="3xl" className="mb-2 text-center">Contato</Heading>
      <Paragraph variant="muted" className="mb-8 text-center">
        Preencha o formulário abaixo para solicitar uma consultoria
      </Paragraph>
      <div className="space-y-4">
        <div className="bg-zinc-800-alpha-50 h-12 rounded-lg animate-pulse" />
        <div className="bg-zinc-800-alpha-50 h-12 rounded-lg animate-pulse" />
        <div className="bg-zinc-800-alpha-50 h-32 rounded-lg animate-pulse" />
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Cancelar</Button>
          <Button>Enviar</Button>
        </div>
      </div>
    </Container>
  ),
};

