import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { FocusTrap } from '@/components/a11y/FocusTrap';

type FocusTrapStoryProps = {
  isActive: boolean;
};

const FocusTrapCanvas = ({ isActive }: FocusTrapStoryProps) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-[320px] bg-surface text-foreground flex items-center justify-center">
      <FocusTrap isActive={isActive} initialFocusRef={primaryButtonRef}>
        <div className="w-full max-w-md rounded-xl border border-border-soft bg-surface-soft p-6 shadow-ds-soft space-y-4">
          <h3 className="text-xl font-semibold">FocusTrap ativo</h3>
          <p className="text-sm text-muted-foreground">
            Use Tab/Shift+Tab para navegar. O foco permanece dentro do container até que `isActive` seja
            desativado.
          </p>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">
              Nome
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-border-soft bg-surface px-3 py-2 text-sm"
                placeholder="Seu nome"
              />
            </label>
            <label className="text-sm font-medium">
              E-mail
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-border-soft bg-surface px-3 py-2 text-sm"
                placeholder="voce@email.com"
              />
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-surface px-4 py-2 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              ref={primaryButtonRef}
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-accent-emerald to-accent-lime px-4 py-2 text-sm font-semibold text-zinc-900 shadow-ds-soft"
            >
              Salvar
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};

const meta = {
  title: 'A11y/FocusTrap',
  component: FocusTrapCanvas,
  tags: ['autodocs'],
  args: {
    isActive: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper para manter o foco dentro de um modal/diálogo e restaurá-lo ao elemento anterior ao fechar.',
      },
    },
  },
} satisfies Meta<typeof FocusTrapCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <div className="min-h-[360px] bg-surface text-foreground flex items-center justify-center">
        <button
          type="button"
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-accent-emerald to-accent-lime px-4 py-2 text-base font-semibold text-zinc-900 shadow-ds-soft"
        >
          Abrir painel
        </button>
        {isOpen ? (
          <FocusTrap
            isActive
            initialFocusRef={closeButtonRef}
            returnFocusRef={triggerRef}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-surface-overlay">
              <div className="w-full max-w-md rounded-xl border border-border-soft bg-surface-soft p-6 shadow-ds-strong space-y-4">
                <h3 className="text-lg font-semibold">Painel com retorno de foco</h3>
                <p className="text-sm text-muted-foreground">
                  Ao fechar, o foco volta para o botão de abertura (`returnFocusRef`).
                </p>
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-surface px-4 py-2 text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </FocusTrap>
        ) : null}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

