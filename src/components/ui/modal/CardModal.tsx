import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils';
import { FocusTrap } from '../../a11y/FocusTrap';
import '../../../styles/card-modal.scss';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Type guard para verificar se um elemento é HTMLElement
 */
function isHTMLElement(element: Element | null): element is HTMLElement {
  return element !== null && element instanceof HTMLElement;
}

export function CardModal({ isOpen, onClose, title, icon, children, className }: CardModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Salva o elemento que tinha foco antes de abrir o modal
      const activeElement = document.activeElement;
      if (isHTMLElement(activeElement)) {
        previousActiveElementRef.current = activeElement;
      }
      document.body.style.overflow = 'hidden';
      // Foca no botão de fechar após um pequeno delay para garantir que o modal está renderizado
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      // Restaura o foco ao elemento anterior
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="card-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <FocusTrap isActive={isOpen} initialFocusRef={closeButtonRef}>
        <div 
          className={cn("card-modal-content", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-modal-header">
            <div className="card-modal-title-wrapper">
              {icon && <span className="card-modal-icon" aria-hidden="true">{icon}</span>}
              <h2 id="modal-title" className="card-modal-title">{title}</h2>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="card-modal-close"
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div id="modal-description" className="sr-only">
            Conteúdo do modal: {title}
          </div>
          <div className="card-modal-body">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
