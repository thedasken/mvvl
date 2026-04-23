import * as React from 'react';

import { cn } from '@/libs/utils';
import { ButtonVariant } from '@/types/button';

interface Props extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button: React.FC<Props> = ({ children, variant, className, ...props }) => {
  const variants = {
    accent: 'bg-accent text-background',
    destructive: 'bg-destructive text-background',
    ghost: 'bg-transparent text-foreground',
    primary: 'bg-foreground text-background',
    secondary: 'bg-muted text-foreground',
  };

  return (
    <button
      className={cn(
        'px-5 h-11 rounded-lg',
        'cursor-pointer text-sm font-medium',
        'flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 ring-accent',
        variants[variant],
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
