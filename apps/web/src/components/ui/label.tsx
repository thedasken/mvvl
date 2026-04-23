import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'label'> {
  //
}

export const Label: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <label className={cn('block text-xs text-foreground mb-1 font-medium', className)} {...props}>
      {children}
    </label>
  );
};
