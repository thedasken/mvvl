import { useNavigate, useParams } from 'react-router-dom';

import { PersonForm } from '@/components/person-form';
import { Panic } from '@/components/placeholders/error';
import { Loading } from '@/components/placeholders/loading';
import { usePerson, useUpdatePerson } from '@/hooks/use-person';
import type { PersonInput } from '@/types/person';

export function EditPage() {
  const navigate = useNavigate();
  const mutation = useUpdatePerson();

  const { nik } = useParams<{ nik: string }>();
  const { data, isLoading: loading, isError: error } = usePerson(nik);

  function handleSubmit(payload: PersonInput) {
    if (!nik) return;
    const { nik: _nik, ...rest } = payload;
    mutation.mutate(
      { nik, payload: rest },
      {
        onSuccess: () => navigate('/'),
      },
    );
  }

  if (loading) return <Loading />;
  if (error || !data) return <Panic>Data tidak ditemukan.</Panic>;

  return (
    <PersonForm
      type='edit'
      title='Edit Data Pribadi'
      defaultValues={data}
      onSubmit={handleSubmit}
      loading={mutation.isPending}
      error={mutation.error ? mutation.error.message : null}
    />
  );
}
