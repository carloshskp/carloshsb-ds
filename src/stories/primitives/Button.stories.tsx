import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Mail } from 'lucide-react';

import { Button } from '@/components/ui/primitives';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Chamada para ação',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Botão reutilizável baseado nos tokens `accent-emerald`/`accent-lime`. Suporta variantes, estados de loading e ícones.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Remover contato',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Quero saber mais',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: <Mail className="h-4 w-4" aria-hidden="true" />,
    rightIcon: <ArrowRight className="h-4 w-4" aria-hidden="true" />,
    children: 'Enviar mensagem',
  },
};

