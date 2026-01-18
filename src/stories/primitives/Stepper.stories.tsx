import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '@/components/ui/primitives/stepper';

const meta = {
  title: 'Primitives/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de indicador de progresso para formulários multi-step e wizards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Step atual do formulário',
    },
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total de steps do formulário',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do stepper',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho dos indicadores de step',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Stepper padrão com 5 steps, step 1 ativo
 */
export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
  },
};

/**
 * Stepper com steps intermediários concluídos
 */
export const MidProgress: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
  },
};

/**
 * Stepper com todos os steps concluídos
 */
export const Completed: Story = {
  args: {
    currentStep: 6,
    totalSteps: 5,
  },
};

/**
 * Stepper com labels para cada step
 */
export const WithLabels: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    steps: [
      { label: 'Dados Pessoais' },
      { label: 'Serviço' },
      { label: 'Detalhes' },
      { label: 'Revisão' },
    ],
  },
};

/**
 * Stepper na orientação vertical
 */
export const Vertical: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    orientation: 'vertical',
  },
};

/**
 * Stepper com tamanho pequeno
 */
export const SizeSmall: Story = {
  args: {
    currentStep: 2,
    totalSteps: 5,
    size: 'sm',
  },
};

/**
 * Stepper com tamanho grande
 */
export const SizeLarge: Story = {
  args: {
    currentStep: 2,
    totalSteps: 5,
    size: 'lg',
  },
};

/**
 * Stepper com apenas 3 steps
 */
export const ThreeSteps: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};

