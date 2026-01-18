import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Info } from 'lucide-react';

import { CardModal } from '@/components/ui/modal/CardModal';

type CardModalStoryProps = {
  title: string;
  showIcon: boolean;
  body: ReactNode;
};

const CardModalCanvas = ({ title, showIcon, body }: CardModalStoryProps) => (
  <div className="min-h-[520px] bg-surface text-foreground flex items-center justify-center">
    <CardModal
      isOpen
      onClose={() => undefined}
      title={title}
      icon={
        showIcon ? (
          <Info className="text-accent-lime" aria-hidden="true" />
        ) : undefined
      }
    >
      {body}
    </CardModal>
  </div>
);

const meta = {
  title: 'Feedback/CardModal',
  component: CardModalCanvas,
  tags: ['autodocs'],
  args: {
    title: 'Diagnóstico de performance',
    showIcon: true,
    body: (
      <p>
        Use este modal para contextualizar auditorias, resultados ou formulários complementares. Ele compartilha
        o gradiente e o blur do Terminal para manter consistência visual.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Modal em glassmorphism utilizado para apresentar conteúdo rico (textos, formulários, passos). Contém FocusTrap e restaura o foco ao fechar.',
      },
    },
  },
} satisfies Meta<typeof CardModalCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongContent: Story = {
  args: {
    body: (
      <div className="space-y-4">
        <p>
          A área do corpo aceita qualquer conteúdo React. Use `space-y-*` para espaçamento vertical e mantenha o
          contraste de texto com `text-foreground`.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          <li>Scroll personalizado já está habilitado.</li>
          <li>Backdrop utiliza `backdrop-filter: blur(8px)`.</li>
          <li>
            Para formulários, combine com os novos primitives para inputs (ver etapa *Primitives* do design
            system).
          </li>
        </ul>
      </div>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
    title: 'Modal sem ícone',
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="min-h-[520px] bg-surface text-foreground flex flex-col items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-accent-emerald to-accent-lime px-5 py-3 text-base font-semibold text-zinc-900 shadow-ds-soft transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Abrir modal
        </button>
        <CardModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Fluxo interativo"
          icon={<Info className="text-accent-lime" aria-hidden="true" />}
        >
          <p>Este exemplo demonstra o FocusTrap e a restauração de foco ao fechar.</p>
        </CardModal>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

