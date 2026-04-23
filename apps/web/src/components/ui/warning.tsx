import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'div'> {
  //
}

export const Warning: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <p className={cn('mt-1 text-xs text-red-500', className)} {...props}>
      {children}
    </p>
  );
};
