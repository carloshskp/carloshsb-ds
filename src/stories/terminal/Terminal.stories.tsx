import { useCallback, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  TerminalBody,
  TerminalContainer,
  TerminalControls,
  TerminalHeader,
} from '@/components/ui/terminal';
import { Heading } from '@/components/ui/primitives/text';

type TerminalStoryProps = {
  title: string;
  content: ReactNode;
  isVisible: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
};

const TerminalExample = ({
  title,
  content,
  isVisible,
  isMaximized,
  isMinimized,
}: TerminalStoryProps) => (
  <div className="relative min-h-[460px] bg-surface text-foreground p-6 flex items-center justify-center">
    <TerminalContainer
      className="!relative !inset-auto !left-0 !translate-x-0 !bottom-auto w-full max-w-3xl mx-auto"
      isVisible={isVisible}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
    >
      <TerminalHeader>
        <Heading as="h2" variant="default" className="terminal-title px-2 flex items-center h-[2.5rem]">
          {title}
        </Heading>
        <TerminalControls
          isMaximized={isMaximized}
          onMinimize={() => undefined}
          onMaximize={() => undefined}
          onClose={() => undefined}
        />
      </TerminalHeader>
      <TerminalBody isMinimized={isMinimized}>{content}</TerminalBody>
    </TerminalContainer>
  </div>
);

const meta = {
  title: 'Components/Terminal/Playground',
  component: TerminalExample,
  tags: ['autodocs'],
  args: {
    title: 'Info',
    content:
      'Há 14 anos construindo e evoluindo aplicações web. Integrações bem arquitetadas, performance medida e otimizada, SEO consistente e processos DX pensados para o time entregar mais.',
    isVisible: true,
    isMaximized: false,
    isMinimized: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Terminal inspirado em consoles com glassmorphism verde. Use sempre `TerminalContainer > TerminalHeader (+ TerminalControls) > TerminalBody` para manter a estrutura e os tokens documentados.',
      },
    },
  },
} satisfies Meta<typeof TerminalExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Maximized: Story = {
  args: {
    isMaximized: true,
  },
};

export const Minimized: Story = {
  args: {
    isMinimized: true,
    content:
      'O corpo permanece acessível via leitor de tela, mas fica oculto visualmente quando minimizado.',
  },
};

export const JSXContent: Story = {
  args: {
    title: 'Contato rápido',
    content: (
      <div className="space-y-2 text-sm leading-6">
        <p>
          Preferiu um atalho? Envie um e-mail:
          {' '}
          <a
            className="underline text-foreground focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-focus-ring"
            href="mailto:contato@carloshb.com.br"
          >
            contato@carloshb.com.br
          </a>
        </p>
        <p>
          Dica: use <kbd>Alt + M</kbd> para minimizar e <kbd>Alt + Shift + M</kbd> para maximizar.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  name: 'Interactive controls',
  render: ({ content, title }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = useCallback(() => {
      setIsMinimized(true);
      setIsMaximized(false);
    }, []);

    const handleMaximize = useCallback(() => {
      setIsMaximized((prev) => !prev);
      setIsMinimized(false);
      setIsVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsVisible(false);
    }, []);

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-surface-soft px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={() => setIsVisible(true)}
          >
            Reabrir
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-surface-soft px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={handleMinimize}
          >
            Minimizar
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-accent-emerald to-accent-lime px-4 py-2 text-sm font-semibold text-zinc-900 shadow-ds-soft transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={handleMaximize}
          >
            Alternar maximizado
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-surface-soft px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={handleClose}
          >
            Fechar
          </button>
        </div>
        <div className="relative min-h-[420px] bg-surface text-foreground p-6 flex items-center justify-center">
          <TerminalContainer
            className="!relative !inset-auto !left-0 !translate-x-0 !bottom-auto w-full max-w-3xl mx-auto"
            isVisible={isVisible}
            isMaximized={isMaximized}
            isMinimized={isMinimized}
          >
            <TerminalHeader>
              <Heading as="h2" variant="default" className="terminal-title px-2 flex items-center h-[2.5rem]">
                {title}
              </Heading>
              <TerminalControls
                isMaximized={isMaximized}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                onClose={handleClose}
              />
            </TerminalHeader>
            <TerminalBody isMinimized={isMinimized}>{content}</TerminalBody>
          </TerminalContainer>
        </div>
      </div>
    );
  },
  args: {
    title: 'Terminal interativo',
    content:
      'Este canvas recria os atalhos principais do terminal (minimizar, maximizar, fechar) para testar a ergonomia antes de publicar alterações.',
  },
};

