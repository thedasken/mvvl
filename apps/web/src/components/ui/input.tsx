import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'input'> {
  //
}

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'w-full',
        'px-3 h-11 rounded-lg',
        'text-sm font-medium border ',
        'focus:outline-none focus:ring-2 ring-accent',
        className,
      )}
      {...props}
    />
  );
};
