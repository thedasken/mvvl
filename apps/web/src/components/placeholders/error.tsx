import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const Panic: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex h-110 w-full items-center justify-center rounded-2xl border bg-zinc-50'>
      <div className='flex items-center gap-2 text-sm'>
        <AlertTriangle size={16} className='text-destructive' />
        <span>{children}</span>
      </div>
    </div>
  );
};
