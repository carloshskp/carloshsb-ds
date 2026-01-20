import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { SquareCheck, SquareDashed } from 'lucide-react';

import { cn } from '../../../utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, disabled, checked, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `checkbox-${generatedId}`;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group flex items-start gap-3 rounded-md border border-input-border bg-input-bg px-4 py-3 transition-all duration-200 ease-in-out hover:border-border-strong hover:bg-input-bg cursor-pointer',
          disabled && 'opacity-60 cursor-not-allowed',
          className,
        )}
      >
        <div className="relative mt-1 flex h-5 w-5 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer peer"
            {...props}
          />
          <span
            className={cn(
              'flex items-center justify-center transition-colors duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-glass',
              checked ? 'text-accent-lime' : 'text-input-text',
            )}
          >
            {checked ? (
              <SquareCheck className="h-5 w-5" aria-hidden="true" />
            ) : (
              <SquareDashed className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
        </div>
        <span className="flex-1 text-sm text-input-text">
          {label ? <span className="font-medium">{label}</span> : null}
          {description ? <p className="text-xs text-text-zinc-400">{description}</p> : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

