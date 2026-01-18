import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { SideNav } from '@/components/ui/side-nav';

type SideNavStoryProps = {
  path: string;
};

const SideNavCanvas = ({ path }: SideNavStoryProps) => (
  <div className="relative min-h-[520px] bg-surface text-foreground">
    <MemoryRouter initialEntries={[path]}>
      <div className="h-full">
        <SideNav />
      </div>
    </MemoryRouter>
  </div>
);

const meta = {
  title: 'Navigation/SideNav',
  component: SideNavCanvas,
  tags: ['autodocs'],
  args: {
    path: '/',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Navegação lateral em glassmorphism usada a partir do breakpoint `md`. Cada item mostra tooltip e estado ativo via gradiente verde.',
      },
    },
    router: {
      disable: true,
    },
  },
} satisfies Meta<typeof SideNavCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AboutActive: Story = {
  args: {
    path: '/about',
  },
};

export const ContactActive: Story = {
  args: {
    path: '/contact',
  },
};

