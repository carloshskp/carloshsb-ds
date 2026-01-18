import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '@/components/ui/primitives/alert';
import { Zap } from 'lucide-react';

const meta = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de alerta para exibir mensagens com diferentes níveis de severidade.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success', 'warning', 'info'],
      description: 'Variante/severidade do alerta',
    },
    title: {
      control: 'text',
      description: 'Título opcional do alerta',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Ocultar o ícone',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Alerta de erro para mensagens de falha
 */
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Não foi possível enviar seu contato, aguarde alguns minutos e tente novamente ou envie para contato@carloshb.com.br',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta de sucesso para confirmações
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Sua mensagem foi enviada com sucesso!',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta de aviso para informações importantes
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Por favor, verifique os campos destacados antes de continuar.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta informativo para dicas e instruções
 */
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Você pode editar suas informações a qualquer momento.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta com título
 */
export const WithTitle: Story = {
  args: {
    variant: 'error',
    title: 'Erro ao enviar',
    children: 'Não foi possível processar sua solicitação. Tente novamente mais tarde.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta com ícone customizado
 */
export const CustomIcon: Story = {
  args: {
    variant: 'warning',
    icon: <Zap className="w-5 h-5 flex-shrink-0" />,
    children: 'Processamento pode demorar alguns segundos.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Alerta sem ícone
 */
export const NoIcon: Story = {
  args: {
    variant: 'info',
    hideIcon: true,
    children: 'Alerta simples sem ícone.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

/**
 * Todos os variantes juntos
 */
export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Alert variant="error">Mensagem de erro</Alert>
      <Alert variant="success">Mensagem de sucesso</Alert>
      <Alert variant="warning">Mensagem de aviso</Alert>
      <Alert variant="info">Mensagem informativa</Alert>
    </div>
  ),
};

