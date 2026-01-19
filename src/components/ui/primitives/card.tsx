import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, createContext, useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils';

/* --------------------------------- Context -------------------------------- */

interface CardContextValue {
  variant: 'default' | 'interactive' | 'review' | null;
}

const CardContext = createContext<CardContextValue>({ variant: null });

/* ---------------------------------- Root ---------------------------------- */

const cardVariants = cva(
  'relative overflow-hidden rounded-xl border backdrop-blur-[10px] transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-800-alpha-80 border-zinc-400-alpha-10 p-6',
        interactive:
          'bg-zinc-800-alpha-80 border-zinc-400-alpha-10 p-6 cursor-pointer hover:translate-y-[-4px] hover:border-zinc-400-alpha-30 hover:shadow-ds-card-hover focus:outline-2 focus:outline-accent-lime focus:outline-offset-2',
        review:
          'bg-zinc-800-alpha-50 border-zinc-400-alpha-20 p-6 rounded-lg hover:bg-zinc-800-alpha-50 hover:border-zinc-400-alpha-30',
      },
      withGradient: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: ['default', 'interactive'],
        withGradient: true,
        className: 'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-accent-top before:opacity-60 before:transition-all before:duration-300',
      },
      {
        variant: 'interactive',
        withGradient: true,
        className: 'before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:opacity-80',
      },
    ],
    defaultVariants: {
      variant: 'default',
      withGradient: true,
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', withGradient = true, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant }}>
        <div
          ref={ref}
          className={cn(cardVariants({ variant, withGradient }), className)}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

Card.displayName = 'Card';

/* --------------------------------- Header --------------------------------- */

const cardHeaderVariants = cva('flex items-center gap-3 text-text-zinc-200', {
  variants: {
    size: {
      sm: 'mb-3',
      md: 'mb-4',
      lg: 'mb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  icon?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, icon, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ size }), className)}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'Card.Header';

/* --------------------------------- Content -------------------------------- */

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-text-zinc-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'Card.Content';

/* --------------------------------- Footer --------------------------------- */

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 pt-4 border-t border-zinc-400-alpha-10', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'Card.Footer';

/* ---------------------------- Interactive Card ---------------------------- */

export interface InteractiveCardProps extends Omit<CardProps, 'variant'> {
  flipped?: boolean;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  onFlip?: () => void;
}

/**
 * Card interativo com suporte a flip animation.
 * Usado principalmente na página About para os cards de experiência, educação, etc.
 */
const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, flipped = false, frontContent, backContent, onFlip, children, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onFlip?.();
      }
    };

    return (
      <Card
        ref={ref}
        variant="interactive"
        withGradient
        className={cn(
          'perspective-[1000px] min-h-[220px] flex flex-col h-full',
          className,
        )}
        onClick={onFlip}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        {...props}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-[length:600ms] ease-[timing-function:cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]',
            flipped && '[transform:rotateY(180deg)]',
          )}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-center gap-2">
            {frontContent ?? children}
          </div>
          {/* Back */}
          {backContent && (
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center text-text-zinc-200">
              {backContent}
            </div>
          )}
        </div>
      </Card>
    );
  },
);

InteractiveCard.displayName = 'InteractiveCard';

/* -------------------------------- Exports --------------------------------- */

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  InteractiveCard,
  CardContext,
  useContext as useCardContext,
};

