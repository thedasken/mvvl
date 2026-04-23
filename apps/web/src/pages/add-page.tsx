import { useNavigate } from 'react-router-dom';

import { PersonForm } from '@/components/person-form';
import { useCreatePerson } from '@/hooks/use-person';
import type { PersonInput } from '@/types/person';

export function AddPage() {
  const navigate = useNavigate();
  const mutation = useCreatePerson();

  const handleSubmit = (payload: PersonInput) => {
    mutation.mutate(payload, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <PersonForm
      type='add'
      title='Tambah Data Baru'
      onSubmit={handleSubmit}
      loading={mutation.isPending}
      error={mutation.error ? mutation.error.message : null}
    />
  );
}
