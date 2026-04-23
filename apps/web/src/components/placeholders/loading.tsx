import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className='flex h-110 w-full items-center justify-center rounded-2xl border bg-zinc-50'>
      <div className='flex items-center gap-2 text-sm'>
        <Loader2 className='text-accent animate-spin' />
        <span>Memuat data...</span>
      </div>
    </div>
  );
};
