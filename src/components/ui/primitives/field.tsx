/* eslint-disable react-refresh/only-export-components */
import {
  cloneElement,
  createContext,
  useContext,
  useId,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn, filterDOMProps } from '../../../utils';

type FieldContextValue = {
  inputId: string;
  hintId?: string;
  errorId?: string;
  hasError: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

const useFieldContext = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    throw new Error('Field components must be used within <Field.Root>.');
  }
  return ctx;
};

type FieldRootProps = {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

function Root({ id, label, hint, error, required, children, className }: FieldRootProps) {
  const generatedId = useId();
  const inputId = id ?? `field-${generatedId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const value = useMemo<FieldContextValue>(
    () => ({
      inputId,
      hintId,
      errorId,
      hasError: Boolean(error),
    }),
    [inputId, hintId, errorId, error],
  );

  return (
    <FieldContext.Provider value={value}>
      <div className={cn('space-y-2', className)}>
        {label ? (
          <FieldLabel required={required} htmlFor={inputId}>
            {label}
          </FieldLabel>
        ) : null}
        {children}
        {error ? (
          <FieldError id={errorId}>{error}</FieldError>
        ) : hint ? (
          <FieldHint id={hintId}>{hint}</FieldHint>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

type LabelProps = {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};

function FieldLabel({ children, htmlFor, required, className }: LabelProps) {
  const ctx = useContext(FieldContext);
  const targetId = htmlFor ?? ctx?.inputId;
  return (
    <label htmlFor={targetId} className={cn("block text-sm font-medium text-text-zinc-200", className)}>
      {children}
      {required ? <span className="ml-1 text-accent-amber" aria-hidden="true">*</span> : null}
    </label>
  );
}

type HintProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

function FieldHint({ children, id, className }: HintProps) {
  const ctx = useContext(FieldContext);
  return (
    <p
      id={id ?? ctx?.hintId}
      className={cn("text-sm text-text-zinc-400", className)}
    >
      {children}
    </p>
  );
}

type ErrorProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

function FieldError({ children, id, className }: ErrorProps) {
  const ctx = useContext(FieldContext);
  return (
    <p
      id={id ?? ctx?.errorId}
      className={cn("text-sm text-destructive", className)}
      role="alert"
    >
      {children}
    </p>
  );
}

type ControlElementProps = {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
};

type ControlProps = {
  children: ReactElement<ControlElementProps>;
};

function Control({ children }: ControlProps) {
  const ctx = useFieldContext();

  const describedBy = [
    children.props['aria-describedby'],
    ctx.errorId,
    ctx.hintId,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  // Filtra props inválidas antes de clonar
  const validProps = filterDOMProps(children.props as Record<string, unknown>);

  return cloneElement(children, {
    ...validProps,
    id: children.props.id ?? ctx.inputId,
    'aria-describedby': describedBy,
    'aria-invalid': children.props['aria-invalid'] ?? (ctx.hasError || undefined),
  });
}

export const Field = {
  Root,
  Label: FieldLabel,
  Hint: FieldHint,
  Error: FieldError,
  Control,
};
