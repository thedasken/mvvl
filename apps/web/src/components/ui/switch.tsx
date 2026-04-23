import * as React from 'react';

import { cn } from '@/libs/utils';

interface SwitchProps extends React.ComponentProps<'input'> {
  //
}

export const Switch: React.FC<SwitchProps> = ({ className, disabled, children, ...props }) => {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
      <div className='relative'>
        <input className='peer sr-only' disabled={disabled} {...props} />
        <div
          className={cn(
            'transition-colors',
            'peer-checked:bg-accent',
            'h-6 w-10 rounded-full bg-muted',
          )}
        />
        <div
          className={cn(
            'rounded-full bg-white',
            'absolute top-0.5 left-0.5 size-5',
            'transition-transform peer-checked:translate-x-4',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:outline-none',
          )}
        />
      </div>
      {<span className='text-foreground mb-1 block text-xs font-medium'>{children}</span>}
    </label>
  );
};
