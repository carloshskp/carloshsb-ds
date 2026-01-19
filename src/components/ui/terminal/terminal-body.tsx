import React from 'react';
import {twMerge} from "tailwind-merge";
import '../../../styles/terminal.scss';
import { TypeWriter } from './type-writer';

type TerminalBodyProps = {
  className?: string;
  isMinimized: boolean;
  children: React.ReactNode;
};

export function TerminalBody({ className, children, isMinimized }: TerminalBodyProps): React.JSX.Element {
  return (
    <main 
      className={twMerge(
        'w-full text-text-zinc-200 terminal-body terminal font-mono text-sm leading-relaxed px-3 py-2',
        isMinimized ? 'sm:h-0 sm:invisible' : 'sm:h-auto sm:visible',
        className,
      )}
      role="region"
      aria-label="Conteúdo do terminal"
      aria-hidden={isMinimized}
      id="terminal-content"
    >
      {typeof children === 'string' ? (
        <TypeWriter text={children} speed={100} delay={0} />
      ) : (
        children
      )}
    </main>
  );
}

export default TerminalBody;
