import { Button } from '@/components/ui/button';
import { Person } from '@/types/person';

type Props = {
  person: Person;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function DeleteModal({ person, onConfirm, onCancel, isLoading }: Props) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]'>
      <div className='bg-background w-full max-w-lg rounded-2xl border'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <h3 className='text-foreground font-medium'>Konfirmasi Penghapusan</h3>
        </div>

        <div className='p-6 text-sm'>
          <p>
            Anda yakin menghapus data{' '}
            <span className='text-foreground font-medium'>{person.nama_lengkap}</span>?
            <br />
            Tindakan ini tidak dapat dibatalkan, pastikan Anda sudah memeriksa kembali data yang
            akan dihapus.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-3 border-t px-6 py-4'>
          <Button variant='secondary' onClick={onCancel} disabled={isLoading}>
            Batalkan
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isLoading}>
            Hapus Data
          </Button>
        </div>
      </div>
    </div>
  );
}
