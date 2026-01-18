import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/primitives/badge';

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de badge/tag para exibir labels, categorias e habilidades.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'outline', 'muted'],
      description: 'Variante visual do badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Badge padrão
 */
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'React',
  },
};

/**
 * Badge com destaque (accent)
 */
export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'TypeScript',
  },
};

/**
 * Badge apenas com borda
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Node.js',
  },
};

/**
 * Badge muted/sutil
 */
export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Em desenvolvimento',
  },
};

/**
 * Badge pequeno
 */
export const SizeSmall: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'New',
  },
};

/**
 * Badge grande
 */
export const SizeLarge: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: 'JavaScript',
  },
};

/**
 * Lista de habilidades com badges
 */
export const SkillsList: Story = {
  render: () => {
    const skills = [
      'React',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Desenvolvimento Web',
      'Liderança Técnica',
      'Arquitetura de Software',
      'Agile/Scrum',
    ];

    return (
      <div className="flex flex-wrap gap-3 max-w-md">
        {skills.map((skill) => (
          <Badge key={skill} variant="default">
            {skill}
          </Badge>
        ))}
      </div>
    );
  },
};

/**
 * Badges com diferentes variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
};

/**
 * Badges com diferentes tamanhos
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

