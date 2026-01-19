import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  children: ReactNode;
  isActive?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Type guard para verificar se um elemento é HTMLElement
 */
function isHTMLElement(element: Element | null): element is HTMLElement {
  return element !== null && element instanceof HTMLElement;
}

/**
 * FocusTrap Component
 * Gerencia o foco dentro de um modal ou diálogo, mantendo o foco preso
 * e restaurando o foco ao elemento anterior quando desativado
 */
export function FocusTrap({ 
  children, 
  isActive = true, 
  initialFocusRef,
  returnFocusRef,
  className
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Salva o elemento que tinha foco antes de abrir o modal
    const activeElement = document.activeElement;
    if (isHTMLElement(activeElement)) {
      previousActiveElementRef.current = activeElement;
    }
    const restoreTarget = returnFocusRef?.current;

    // Foca no elemento inicial se fornecido
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else if (containerRef.current) {
      // Caso contrário, foca no primeiro elemento focável dentro do container
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (isHTMLElement(firstFocusable)) {
        firstFocusable.focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const firstFocusable = isHTMLElement(firstElement) ? firstElement : null;
      const lastFocusable = isHTMLElement(lastElement) ? lastElement : null;

      if (event.shiftKey) {
        // Shift + Tab
        if (firstFocusable && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (lastFocusable && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restaura o foco ao elemento anterior
      if (restoreTarget) {
        restoreTarget.focus();
      } else if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isActive, initialFocusRef, returnFocusRef]);

  return (
    <div ref={containerRef} tabIndex={-1} className={className}>
      {children}
    </div>
  );
}
