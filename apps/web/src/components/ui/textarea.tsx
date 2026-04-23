import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'textarea'> {
  //
}

export const Textarea: React.FC<Props> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'w-full',
        'p-3 rounded-lg',
        'text-sm font-medium border ',
        'focus:outline-none focus:ring-2 ring-accent',
        className,
      )}
      {...props}
    />
  );
};
