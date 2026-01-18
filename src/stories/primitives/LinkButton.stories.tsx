import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { LinkButton, ExternalLinkButton } from '@/components/ui/primitives/link-button';
import { ArrowRight, ArrowLeft, Linkedin } from 'lucide-react';

const meta = {
  title: 'Primitives/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Link estilizado como botão. Usa react-router-dom internamente para navegação.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'cta', 'linkedin'],
      description: 'Variante visual do link',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do link',
    },
    to: {
      control: 'text',
      description: 'Rota de destino (react-router-dom)',
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * LinkButton primário
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    to: '/about',
    children: 'Saiba mais',
  },
};

/**
 * LinkButton secundário
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    to: '/',
    children: 'Voltar para a página inicial',
  },
};

/**
 * LinkButton ghost
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    to: '/contact',
    children: 'Entrar em contato',
  },
};

/**
 * LinkButton CTA (Call to Action)
 */
export const CTA: Story = {
  args: {
    variant: 'cta',
    size: 'xl',
    to: '/about',
    children: 'Quero saber mais...',
  },
};

/**
 * LinkButton com ícone à esquerda
 */
export const WithLeftIcon: Story = {
  args: {
    variant: 'secondary',
    to: '/',
    leftIcon: <ArrowLeft className="w-5 h-5" />,
    children: 'Voltar',
  },
};

/**
 * LinkButton com ícone à direita
 */
export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    to: '/contact',
    rightIcon: <ArrowRight className="w-5 h-5" />,
    children: 'Solicitar Consultoria',
  },
};

/**
 * Todos os tamanhos
 */
export const AllSizes: Story = {
  args: {
    to: '/',
    variant: 'primary',
    children: 'Button',
  },
  render: () => (
    <div className="flex items-center gap-4">
      <LinkButton to="/" size="sm">Small</LinkButton>
      <LinkButton to="/" size="md">Medium</LinkButton>
      <LinkButton to="/" size="lg">Large</LinkButton>
      <LinkButton to="/" size="xl">Extra Large</LinkButton>
    </div>
  ),
};

/**
 * Todas as variantes
 */
export const AllVariants: Story = {
  args: {
    to: '/',
    variant: 'primary',
    children: 'Button',
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <LinkButton to="/" variant="primary">Primary</LinkButton>
      <LinkButton to="/" variant="secondary">Secondary</LinkButton>
      <LinkButton to="/" variant="ghost">Ghost</LinkButton>
      <LinkButton to="/" variant="cta">CTA</LinkButton>
    </div>
  ),
};

/**
 * ExternalLinkButton para links externos (LinkedIn)
 */
export const ExternalLinkedIn: Story = {
  args: {
    to: '/',
    variant: 'primary',
    children: 'LinkedIn',
  },
  render: () => (
    <ExternalLinkButton
      href="https://linkedin.com/in/carlosh-bernardes"
      variant="linkedin"
      size="md"
      leftIcon={<Linkedin className="w-5 h-5" />}
      aria-label="Visitar perfil do LinkedIn"
    >
      LinkedIn
    </ExternalLinkButton>
  ),
};

/**
 * ExternalLinkButton primário
 */
export const ExternalPrimary: Story = {
  args: {
    to: '/',
    variant: 'primary',
    children: 'Ver no GitHub',
  },
  render: () => (
    <ExternalLinkButton
      href="https://github.com"
      variant="primary"
      rightIcon={<ArrowRight className="w-5 h-5" />}
    >
      Ver no GitHub
    </ExternalLinkButton>
  ),
};

