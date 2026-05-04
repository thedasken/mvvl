import * as React from 'react';

import { cn } from '@/libs/utils';
import type { ButtonVariant } from '@/types/button';

interface Props extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const IconButton: React.FC<Props> = ({ children, variant, className, ...props }) => {
  const variants = {
    accent: 'hover:bg-accent hover:text-background',
    destructive: 'hover:bg-destructive hover:text-background',
    ghost: 'hover:bg-muted hover:text-foreground',
    primary: 'hover:bg-foreground hover:text-background',
    secondary: 'hover:bg-muted hover:text-foreground',
  };

  return (
    <button
      className={cn(
        'size-10 rounded-lg',
        'cursor-pointer text-foreground',
        'flex items-center justify-center',
        'focus:outline-none focus:ring-2 ring-accent',
        variants[variant],
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
